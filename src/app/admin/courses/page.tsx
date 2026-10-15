import Link from "next/link";
import {
  PlusCircle,
  BookOpen,
  Edit,
  Layers,
  Copy,
  Trash2,
  Eye,
  CheckCircle,
  Archive,
  ExternalLink,
} from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDuration } from "@/lib/utils";
import { CourseStatus } from "@/types";
import {
  setCourseStatusAction,
  duplicateCourseAction,
  deleteCourseAction,
} from "./actions";

export const metadata = {
  title: "Course Management | EduPulse Admin",
  description: "Create, edit, duplicate, archive, and publish enterprise masterclasses.",
};

export default async function AdminCoursesPage() {
  const courses = await dataStore.getCourses({ includeDrafts: true });

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
            Masterclass Catalog
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Manage course configurations, curriculum hierarchies, pricing, and publication statuses.
          </p>
        </div>

        <Link href="/admin/courses/new">
          <Button variant="gradient" size="sm" className="rounded-xl">
            <PlusCircle className="mr-1.5 h-4 w-4" />
            Create Masterclass
          </Button>
        </Link>
      </div>

      {/* Courses Table Card */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border/80 text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Course</th>
                <th className="p-4">Status</th>
                <th className="p-4">Difficulty</th>
                <th className="p-4">Pricing</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Enrollments</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {courses.map((course) => {
                const statusColor = {
                  published: "success",
                  draft: "warning",
                  archived: "destructive",
                }[course.status] as "success" | "warning" | "destructive";

                return (
                  <tr key={course.id} className="hover:bg-muted/30 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 shrink-0 rounded-lg overflow-hidden bg-muted">
                          {course.thumbnail_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={course.thumbnail_url}
                              alt={course.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="truncate max-w-xs md:max-w-sm">
                          <p className="font-bold text-foreground text-sm truncate">
                            {course.title}
                          </p>
                          <p className="text-muted-foreground text-[11px]">
                            {course.category?.name || "General"} • {course.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <Badge variant={statusColor} className="capitalize text-[11px]">
                        {course.status}
                      </Badge>
                    </td>

                    <td className="p-4 capitalize text-muted-foreground font-medium">
                      {course.difficulty.replace("_", " ")}
                    </td>

                    <td className="p-4 font-semibold text-foreground">
                      {course.is_free ? "Free" : formatCurrency(course.price)}
                    </td>

                    <td className="p-4 text-muted-foreground">
                      {formatDuration(course.estimated_duration_minutes)}
                    </td>

                    <td className="p-4 font-semibold text-foreground">
                      {course.enrollment_count || 0}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link href={`/admin/courses/${course.id}/builder`}>
                          <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs" title="Curriculum Builder">
                            <Layers className="mr-1 h-3.5 w-3.5 text-brand-500" />
                            Builder
                          </Button>
                        </Link>

                        <Link href={`/admin/courses/${course.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" title="Edit Metadata">
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                        </Link>

                        {/* Status Toggle */}
                        <form
                          action={async () => {
                            "use server";
                            const nextStatus: CourseStatus =
                              course.status === "published" ? "draft" : "published";
                            await setCourseStatusAction(course.id, nextStatus);
                          }}
                        >
                          <Button
                            type="submit"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg"
                            title={course.status === "published" ? "Unpublish" : "Publish"}
                          >
                            {course.status === "published" ? (
                              <Archive className="h-3.5 w-3.5 text-amber-500" />
                            ) : (
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                            )}
                          </Button>
                        </form>

                        {/* Duplicate */}
                        <form
                          action={async () => {
                            "use server";
                            await duplicateCourseAction(course.id);
                          }}
                        >
                          <Button
                            type="submit"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg"
                            title="Duplicate Course"
                          >
                            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                          </Button>
                        </form>

                        {/* Delete */}
                        <form
                          action={async () => {
                            "use server";
                            await deleteCourseAction(course.id);
                          }}
                        >
                          <Button
                            type="submit"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10"
                            title="Delete Course"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
