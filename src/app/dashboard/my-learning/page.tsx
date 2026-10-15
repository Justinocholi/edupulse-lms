import Link from "next/link";
import { BookOpen, GraduationCap, CheckCircle2, PlayCircle } from "lucide-react";
import { requireAuth } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CourseCard } from "@/components/courses/course-card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "My Learning | EduPulse",
  description: "View all your active, in-progress, and completed courses.",
};

export default async function MyLearningPage() {
  const session = await requireAuth();
  const enrollments = await dataStore.getUserEnrollments(session.user!.id);

  const inProgress = enrollments.filter((e) => e.status === "active");
  const completed = enrollments.filter((e) => e.status === "completed");

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400">
          <GraduationCap className="h-4 w-4" />
          <span>Curriculum Hub</span>
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-foreground">
          My Enrolled Courses
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your course progression, resume video lectures, and review completed masterclasses.
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Enrolled ({enrollments.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgress.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
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
            <EmptyState />
          )}
        </TabsContent>

        <TabsContent value="in-progress">
          {inProgress.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgress.map((enr) => {
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
            <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              No courses currently in progress.
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {completed.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completed.map((enr) => {
                if (!enr.course) return null;
                return (
                  <CourseCard
                    key={enr.id}
                    course={enr.course}
                    isEnrolled={true}
                    progressPercentage={100}
                  />
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              No completed courses yet. Keep going!
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-4">
      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="font-bold text-base text-foreground">You are not enrolled in any courses</h3>
      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
        Discover top software architecture masterclasses and start learning today.
      </p>
      <Link href="/courses">
        <Button variant="default" size="sm">
          Browse Catalog
        </Button>
      </Link>
    </div>
  );
}
