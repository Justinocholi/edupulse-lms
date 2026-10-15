import { notFound, redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";
import { LessonPlayer } from "@/components/learning/lesson-player";

interface LearnPageProps {
  params: {
    courseSlug: string;
  };
  searchParams: {
    lessonId?: string;
  };
}

export async function generateMetadata({ params }: LearnPageProps) {
  const course = await dataStore.getCourseBySlug(params.courseSlug, { includeDrafts: true });
  if (!course) return { title: "Course Not Found" };
  return {
    title: `Learning: ${course.title} | EduPulse`,
  };
}

export default async function CourseLearnPage({ params, searchParams }: LearnPageProps) {
  const session = await getCurrentSession();
  const isAdmin = session.role === "admin";

  const course = await dataStore.getCourseBySlug(params.courseSlug, { includeDrafts: isAdmin });
  if (!course) {
    notFound();
  }

  const userId = session.user?.id;
  const userEnrollment = userId ? await dataStore.getUserEnrollment(userId, course.id) : null;
  const isEnrolled = Boolean(userEnrollment);

  const userProgress = userId ? await dataStore.getUserLessonProgress(userId, course.id) : [];

  return (
    <LessonPlayer
      course={course}
      modules={course.modules || []}
      initialLessonId={searchParams.lessonId || userEnrollment?.last_accessed_lesson_id || undefined}
      userProgressList={userProgress}
      isEnrolled={isEnrolled}
      isAdmin={isAdmin}
    />
  );
}
