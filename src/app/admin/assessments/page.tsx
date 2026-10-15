import Link from "next/link";
import { FileQuestion, HelpCircle, CheckCircle2, ExternalLink } from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Assessments Registry | EduPulse Admin",
};

export default async function AdminAssessmentsPage() {
  const courses = await dataStore.getCourses({ includeDrafts: true });
  const quizzes = await Promise.all(
    courses.map(async (c) => {
      const q = await dataStore.getQuizByCourse(c.id);
      return q ? { ...q, courseTitle: c.title, courseSlug: c.slug } : null;
    })
  );
  const activeQuizzes = quizzes.filter(Boolean);

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
          Assessments & Quiz Registry
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Configure server-evaluated knowledge checks, passing percentages, and question answer banks.
        </p>
      </div>

      <div className="space-y-4">
        {activeQuizzes.map((quiz: any) => (
          <div
            key={quiz.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="brand" className="text-xs">
                  {quiz.courseTitle}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Passing: {quiz.passing_score}%
                </Badge>
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{quiz.title}</h3>
              <p className="text-xs text-muted-foreground">
                {quiz.questions?.length || 5} Questions • Limit: {quiz.time_limit_minutes || 15} mins • {quiz.max_attempts} attempts allowed
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/learn/${quiz.courseSlug}/quiz/${quiz.id}`} target="_blank">
                <Button variant="outline" size="sm" className="rounded-xl text-xs">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                  Preview Exam
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
