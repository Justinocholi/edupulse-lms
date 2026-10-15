import { Suspense } from "react";
import { BookOpen, Frown } from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { getCurrentSession } from "@/lib/auth/session";
import { CourseCard } from "@/components/courses/course-card";
import { CourseFilter } from "@/components/courses/course-filter";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CoursesPageProps {
  searchParams: {
    q?: string;
    category?: string;
    difficulty?: string;
    sort?: "newest" | "rating" | "popular";
  };
}

export const metadata = {
  title: "Explore Courses & Masterclasses | EduPulse",
  description:
    "Browse our full catalog of hands-on software engineering, cloud, distributed systems, and AI masterclasses.",
};

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const session = await getCurrentSession();
  const categories = await dataStore.getCategories();

  const courses = await dataStore.getCourses({
    search: searchParams.q,
    categoryId: searchParams.category,
    difficulty: searchParams.difficulty,
    sort: searchParams.sort,
  });

  const userEnrollments = session.user
    ? await dataStore.getUserEnrollments(session.user.id)
    : [];

  const enrolledCourseIds = new Set(userEnrollments.map((e) => e.course_id));

  return (
    <div className="container py-12 px-4 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          <BookOpen className="h-4 w-4" />
          Course Catalog
        </div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Explore Masterclasses
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Learn directly from experienced practitioners with structured curriculums, hands-on architectural code, and verified completion credentials.
        </p>
      </div>

      {/* Filter Component */}
      <Suspense fallback={<div className="h-20 animate-pulse rounded-2xl bg-muted" />}>
        <CourseFilter
          categories={categories}
          initialSearch={searchParams.q}
          initialCategory={searchParams.category}
          initialDifficulty={searchParams.difficulty}
          initialSort={searchParams.sort}
        />
      </Suspense>

      {/* Course Grid or Empty State */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {courses.map((course) => {
            const isEnrolled = enrolledCourseIds.has(course.id);
            const userEnrollment = userEnrollments.find((e) => e.course_id === course.id);
            return (
              <CourseCard
                key={course.id}
                course={course}
                isEnrolled={isEnrolled}
                progressPercentage={userEnrollment?.progress_percentage}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <Frown className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-foreground">No courses match your filter criteria</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Try adjusting your search terms, difficulty level, or category filter to discover other masterclasses.
          </p>
          <div className="pt-2">
            <Link href="/courses">
              <Button variant="outline" size="sm">
                Clear Filters
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
