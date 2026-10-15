import Link from "next/link";
import { BookOpen, Code2, Cloud, Cpu, ShieldCheck, Palette, ArrowRight } from "lucide-react";
import { dataStore } from "@/lib/db/data-store";

export const metadata = {
  title: "Course Categories & Learning Tracks | EduPulse",
  description: "Browse masterclasses organized by industry domains and architectural disciplines.",
};

export default async function CategoriesPage() {
  const categories = await dataStore.getCategories();

  return (
    <div className="container py-12 px-4 space-y-10">
      <div className="max-w-2xl space-y-3">
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Course Categories
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Explore specialized tracks engineered to elevate your architectural proficiency across software, cloud, and intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/courses?category=${cat.id}`}
            className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <BookOpen className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  {cat.course_count || 1} {cat.course_count === 1 ? "Course" : "Courses"}
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {cat.name}
              </h3>
              <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="mt-6 flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:underline">
              <span>Explore Track</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
