import Link from "next/link";
import { Bookmark, BookOpen } from "lucide-react";
import { requireAuth } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";
import { CourseCard } from "@/components/courses/course-card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Saved Courses & Bookmarks | EduPulse",
  description: "Courses saved for future learning.",
};

export default async function BookmarksPage() {
  const session = await requireAuth();
  const bookmarkedCourses = await dataStore.getUserBookmarks(session.user!.id);

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400">
          <Bookmark className="h-4 w-4" />
          <span>Curated Reading List</span>
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-foreground">
          Saved Courses
        </h1>
        <p className="text-sm text-muted-foreground">
          Masterclasses bookmarked for your upcoming training sprints.
        </p>
      </div>

      {bookmarkedCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-3">
          <Bookmark className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="font-bold text-base text-foreground">No saved courses</h3>
          <p className="text-xs text-muted-foreground">
            Browse our course catalog and bookmark masterclasses you want to revisit later.
          </p>
          <Link href="/courses">
            <Button variant="default" size="sm">
              Explore Catalog
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
