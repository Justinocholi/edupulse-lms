"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Save, Loader2, Sparkles, MoveLeft } from "lucide-react";
import { Category, Course } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/utils";
import { createCourseAction, updateCourseAction } from "@/app/admin/courses/actions";
import { toast } from "sonner";
import Link from "next/link";

interface CourseFormProps {
  categories: Category[];
  initialData?: Course;
}

export function CourseForm({ categories, initialData }: CourseFormProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const [title, setTitle] = React.useState(initialData?.title || "");
  const [slug, setSlug] = React.useState(initialData?.slug || "");
  const [subtitle, setSubtitle] = React.useState(initialData?.subtitle || "");
  const [description, setDescription] = React.useState(initialData?.description || "");
  const [categoryId, setCategoryId] = React.useState(initialData?.category_id || categories[0]?.id || "");
  const [difficulty, setDifficulty] = React.useState(initialData?.difficulty || "all_levels");
  const [status, setStatus] = React.useState(initialData?.status || "draft");
  const [thumbnailUrl, setThumbnailUrl] = React.useState(
    initialData?.thumbnail_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"
  );
  const [trailerVideoUrl, setTrailerVideoUrl] = React.useState(initialData?.trailer_video_url || "");
  const [isFree, setIsFree] = React.useState(initialData?.is_free !== undefined ? initialData.is_free : true);
  const [price, setPrice] = React.useState(initialData?.price || 0);
  const [duration, setDuration] = React.useState(initialData?.estimated_duration_minutes || 120);
  const [passingGrade, setPassingGrade] = React.useState(initialData?.passing_grade_percentage || 75);
  const [certificateEnabled, setCertificateEnabled] = React.useState(
    initialData?.certificate_enabled !== undefined ? initialData.certificate_enabled : true
  );

  // Dynamic outcome lists
  const [outcomes, setOutcomes] = React.useState<string[]>(
    initialData?.learning_outcomes || [
      "Master core architecture patterns",
      "Deploy scalable production microservices",
    ]
  );
  const [newOutcome, setNewOutcome] = React.useState("");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData) {
      setSlug(slugify(val));
    }
  };

  const handleAddOutcome = () => {
    if (newOutcome.trim()) {
      setOutcomes((prev) => [...prev, newOutcome.trim()]);
      setNewOutcome("");
    }
  };

  const handleRemoveOutcome = (idx: number) => {
    setOutcomes((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("description", description);
      formData.append("category_id", categoryId);
      formData.append("difficulty", difficulty);
      formData.append("status", status);
      formData.append("thumbnail_url", thumbnailUrl);
      formData.append("trailer_video_url", trailerVideoUrl);
      formData.append("is_free", String(isFree));
      formData.append("price", String(price));
      formData.append("estimated_duration_minutes", String(duration));
      formData.append("passing_grade_percentage", String(passingGrade));
      formData.append("certificate_enabled", String(certificateEnabled));
      formData.append("learning_outcomes", JSON.stringify(outcomes));
      formData.append("prerequisites", JSON.stringify(initialData?.prerequisites || []));
      formData.append("target_audience", JSON.stringify(initialData?.target_audience || []));

      if (initialData) {
        const res = await updateCourseAction(initialData.id, formData);
        if (res.success) {
          toast.success("Masterclass updated successfully!");
          router.push("/admin/courses");
          router.refresh();
        } else {
          toast.error(res.error || "Update failed");
        }
      } else {
        const res = await createCourseAction(formData);
        if (res.success) {
          toast.success("Masterclass created successfully! Opening builder...");
          router.push(`/admin/courses/${res.courseId}/builder`);
          router.refresh();
        } else {
          toast.error(res.error || "Creation failed");
        }
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/courses">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
              <MoveLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="font-heading text-xl font-bold text-foreground">
            {initialData ? `Edit: ${initialData.title}` : "New Masterclass Blueprint"}
          </h2>
        </div>

        <Button type="submit" variant="gradient" disabled={loading} className="rounded-xl px-6">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {initialData ? "Save Changes" : "Create & Open Builder"}
            </>
          )}
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-foreground">Course Title</label>
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Enterprise Next.js 14 & Supabase Architecture"
              required
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-foreground">Subtitle / Headline</label>
            <Input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="A brief one-sentence synopsis for discovery cards..."
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-foreground">Full Course Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Detailed syllabus, pedagogical objectives, and architectural deliverables..."
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="all_levels">All Levels</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Publication Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="draft">Draft (Restricted to Admins)</option>
              <option value="published">Published (Public Catalog)</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Estimated Duration (Minutes)</label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Passing Grade Percentage (%)</label>
            <Input
              type="number"
              min={50}
              max={100}
              value={passingGrade}
              onChange={(e) => setPassingGrade(Number(e.target.value))}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Price ($ USD)</label>
            <Input
              type="number"
              step="0.01"
              disabled={isFree}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <label className="flex items-center gap-2 pt-1 text-xs text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={isFree}
                onChange={(e) => {
                  setIsFree(e.target.checked);
                  if (e.target.checked) setPrice(0);
                }}
                className="rounded"
              />
              Offer this course for Free
            </label>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-foreground">Thumbnail Image URL</label>
            <Input
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </div>
        </div>

        {/* Dynamic Learning Outcomes */}
        <div className="space-y-3 border-t border-border/80 pt-6">
          <label className="text-xs font-semibold text-foreground block">
            What Learners Will Achieve (Key Learning Outcomes)
          </label>
          <div className="flex gap-2">
            <Input
              value={newOutcome}
              onChange={(e) => setNewOutcome(e.target.value)}
              placeholder="Add an outcome (e.g. Architect Next.js Server Components)..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddOutcome();
                }
              }}
            />
            <Button type="button" variant="outline" onClick={handleAddOutcome}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2 pt-2">
            {outcomes.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl bg-muted/40 p-2.5 text-xs text-foreground"
              >
                <span>{item}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveOutcome(idx)}
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
