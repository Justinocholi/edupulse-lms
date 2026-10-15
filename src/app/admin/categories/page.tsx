import { Tags, Plus, BookOpen } from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";

export const metadata = {
  title: "Category Taxonomy | EduPulse Admin",
};

export default async function AdminCategoriesPage() {
  const categories = await dataStore.getCategories();

  async function addCategoryAction(formData: FormData) {
    "use server";
    await requireAdmin();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    if (name) {
      await dataStore.createCategory({
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        description,
      });
      revalidatePath("/admin/categories");
      revalidatePath("/categories");
    }
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
          Category Taxonomy
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Organize masterclasses into structured technical disciplines and tracks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Create Category Form */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
          <h3 className="font-heading text-base font-bold text-foreground">Add New Category</h3>
          <form action={addCategoryAction} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Category Name</label>
              <input
                name="name"
                required
                placeholder="e.g. Distributed Database Systems"
                className="h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Description</label>
              <textarea
                name="description"
                rows={3}
                placeholder="Pedagogical focus..."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button type="submit" variant="gradient" size="sm" className="w-full rounded-xl">
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Save Category
            </Button>
          </form>
        </div>

        {/* Existing Categories */}
        <div className="md:col-span-2 space-y-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-sm"
            >
              <div>
                <h4 className="font-bold text-sm text-foreground">{cat.name}</h4>
                <p className="text-xs text-muted-foreground line-clamp-1">{cat.description}</p>
                <span className="font-mono text-[10px] text-muted-foreground">{cat.slug}</span>
              </div>
              <Badge variant="outline" className="text-xs font-semibold shrink-0">
                {cat.course_count || 0} Masterclasses
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
