import { notFound, redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";
import { QuizRunner } from "@/components/learning/quiz-runner";

interface QuizPageProps {
  params: {
    courseSlug: string;
    quizId: string;
  };
}

export async function generateMetadata({ params }: QuizPageProps) {
  const quiz = await dataStore.getQuiz(params.quizId);
  return {
    title: quiz ? `${quiz.title} | EduPulse` : "Assessment",
  };
}

export default async function CourseQuizPage({ params }: QuizPageProps) {
  const session = await getCurrentSession();
  if (!session.user) {
    redirect(`/login?next=/learn/${params.courseSlug}/quiz/${params.quizId}`);
  }

  const course = await dataStore.getCourseBySlug(params.courseSlug, { includeDrafts: true });
  if (!course) {
    notFound();
  }

  const quiz = await dataStore.getQuiz(params.quizId);
  if (!quiz) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <QuizRunner
        quiz={quiz}
        courseSlug={params.courseSlug}
        courseTitle={course.title}
      />
    </div>
  );
}
