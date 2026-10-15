import Link from "next/link";
import { FileQuestion, CheckCircle2, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { requireAuth } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Assessments & Quizzes | EduPulse",
  description: "Take knowledge checks, review passing scores, and unlock verified certificates.",
};

export default async function StudentAssessmentsPage() {
  const session = await requireAuth();
  const userId = session.user!.id;

  const enrollments = await dataStore.getUserEnrollments(userId);
  const enrolledCourseIds = enrollments.map((e) => e.course_id);

  // Fetch quizzes for enrolled courses
  const quizzes = await Promise.all(
    enrolledCourseIds.map(async (cId) => dataStore.getQuizByCourse(cId))
  );
  const validQuizzes = quizzes.filter(Boolean);

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
          <FileQuestion className="h-4 w-4" />
          <span>Examinations & Assessments</span>
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-foreground">
          Course Assessments
        </h1>
        <p className="text-sm text-muted-foreground">
          Assessments are strictly evaluated server-side to guarantee learning integrity. Achieving the passing threshold unlocks your official verified certificate.
        </p>
      </div>

      <div className="space-y-4">
        {validQuizzes.length > 0 ? (
          validQuizzes.map((quiz) => {
            if (!quiz) return null;
            const course = enrollments.find((e) => e.course_id === quiz.course_id)?.course;
            return (
              <div
                key={quiz.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-brand-500/30 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="brand" className="text-xs">
                      {course?.title || "Masterclass"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Passing Grade: {quiz.passing_score}%
                    </Badge>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-xl">
                    {quiz.description || "Comprehensive assessment evaluating course concepts and practical application."}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                    <span className="flex items-center gap-1">
                      <FileQuestion className="h-3.5 w-3.5" />
                      {quiz.questions?.length || 5} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {quiz.time_limit_minutes ? `${quiz.time_limit_minutes} mins` : "Untimed"}
                    </span>
                    <span>Max {quiz.max_attempts} attempts</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <Link href={`/learn/${course?.slug || "enterprise-nextjs-supabase-architecture"}/quiz/${quiz.id}`}>
                    <Button variant="gradient" size="sm" className="rounded-xl px-5">
                      Start Assessment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            No active assessments for your enrolled courses yet.
          </div>
        )}
      </div>
    </div>
  );
}
