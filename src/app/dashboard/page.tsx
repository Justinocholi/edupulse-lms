import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  PlayCircle,
  ArrowRight,
  TrendingUp,
  FileQuestion,
  Sparkles,
} from "lucide-react";
import { requireAuth } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/courses/course-card";
import { formatDuration } from "@/lib/utils";

export const metadata = {
  title: "Student Dashboard | EduPulse",
  description: "View your course progress, learning hours, assessments, and earned certificates.",
};

export default async function StudentOverviewPage() {
  const session = await requireAuth();
  const userId = session.user!.id;

  const stats = await dataStore.getStudentStats(userId);
  const enrollments = await dataStore.getUserEnrollments(userId);
  const allCourses = await dataStore.getCourses();

  // Find most recent active enrollment for "Continue Learning"
  const activeEnrollments = enrollments.filter((e) => e.status === "active");
  const lastActive = activeEnrollments[0] || enrollments[0];

  // Recommendations: courses user is not yet enrolled in
  const enrolledIds = new Set(enrollments.map((e) => e.course_id));
  const recommendedCourses = allCourses.filter((c) => !enrolledIds.has(c.id)).slice(0, 2);

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-brand-500/20 bg-gradient-to-r from-brand-950/20 via-background to-teal-950/20 p-6 shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Welcome back, {session.user!.full_name}</span>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
            Student Overview
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Track your curriculum momentum, complete assessments, and claim verified credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/courses">
            <Button variant="outline" size="sm" className="rounded-xl">
              Browse More
            </Button>
          </Link>
          <Link href="/dashboard/my-learning">
            <Button variant="default" size="sm" className="rounded-xl">
              All My Courses
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Enrolled Courses</span>
            <BookOpen className="h-4 w-4 text-brand-500" />
          </div>
          <p className="font-heading text-2xl font-bold text-foreground">
            {stats.enrolledCoursesCount}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {stats.inProgressCoursesCount} in progress • {stats.completedCoursesCount} completed
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Learning Time</span>
            <Clock className="h-4 w-4 text-teal-500" />
          </div>
          <p className="font-heading text-2xl font-bold text-foreground">
            {formatDuration(stats.totalLearningMinutes)}
          </p>
          <p className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
            Active session time
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Average Progress</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="font-heading text-2xl font-bold text-foreground">
            {stats.overallProgressPercentage}%
          </p>
          <Progress value={stats.overallProgressPercentage} className="h-1.5" />
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Certificates</span>
            <Award className="h-4 w-4 text-amber-500" />
          </div>
          <p className="font-heading text-2xl font-bold text-foreground">
            {stats.certificatesEarnedCount}
          </p>
          <Link
            href="/dashboard/certificates"
            className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            View credentials →
          </Link>
        </div>
      </div>

      {/* Continue Learning Spotlight */}
      {lastActive && lastActive.course && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Continue Learning
            </span>
            <Badge variant={lastActive.status === "completed" ? "success" : "brand"}>
              {lastActive.status === "completed" ? "Completed" : "In Progress"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
              {lastActive.course.thumbnail_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={lastActive.course.thumbnail_url}
                  alt={lastActive.course.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="md:col-span-2 space-y-3">
              <h3 className="font-heading text-xl font-bold text-foreground">
                {lastActive.course.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {lastActive.course.subtitle || lastActive.course.description}
              </p>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Course Completion</span>
                  <span className="font-semibold text-foreground">
                    {lastActive.progress_percentage}%
                  </span>
                </div>
                <Progress value={lastActive.progress_percentage} className="h-2" />
              </div>

              <div className="pt-2">
                <Link href={`/learn/${lastActive.course.slug}`}>
                  <Button variant="gradient" size="sm" className="rounded-xl px-5">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Resume Lesson
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enrolled Courses Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-foreground">
            My Enrolled Masterclasses
          </h2>
          <Link
            href="/dashboard/my-learning"
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            View All ({enrollments.length}) <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {enrollments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enr) => {
              if (!enr.course) return null;
              return (
                <CourseCard
                  key={enr.id}
                  course={enr.course}
                  isEnrolled={true}
                  progressPercentage={enr.progress_percentage}
                />
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center space-y-3">
            <BookOpen className="mx-auto h-10 w-10 text-muted-foreground" />
            <h3 className="font-bold text-sm text-foreground">No enrolled courses yet</h3>
            <p className="text-xs text-muted-foreground">
              Explore our masterclasses and enroll to start building real-world expertise.
            </p>
            <Link href="/courses">
              <Button variant="default" size="sm">
                Explore Masterclasses
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Recommended Masterclasses */}
      {recommendedCourses.length > 0 && (
        <div className="space-y-4 border-t border-border pt-8">
          <div className="space-y-1">
            <h2 className="font-heading text-xl font-bold text-foreground">
              Recommended For Your Career Track
            </h2>
            <p className="text-xs text-muted-foreground">
              Based on software architecture and high-throughput system engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
