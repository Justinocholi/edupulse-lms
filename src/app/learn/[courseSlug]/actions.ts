"use server";

import { revalidatePath } from "next/cache";
import { getCurrentSession } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";

export async function toggleLessonCompletionAction(lessonId: string, courseId: string, isCompleted: boolean) {
  const session = await getCurrentSession();
  if (!session.user) {
    return { success: false, error: "Authentication required" };
  }

  // Server-side authorization: verify user is enrolled or platform admin
  const enrollment = await dataStore.getUserEnrollment(session.user.id, courseId);
  if (!enrollment && session.role !== "admin") {
    return { success: false, error: "Active enrollment required to record progress" };
  }

  try {
    const result = await dataStore.markLessonProgress(session.user.id, lessonId, courseId, isCompleted);
    revalidatePath(`/learn`);
    revalidatePath(`/dashboard`);
    return { success: true, progress: result.progress, enrollment: result.enrollment };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update lesson progress" };
  }
}

export async function savePlaybackPositionAction(
  lessonId: string,
  courseId: string,
  playbackPositionSeconds: number,
  timeSpentSeconds?: number
) {
  const session = await getCurrentSession();
  if (!session.user) {
    return { success: false, error: "Authentication required" };
  }

  // Server-side authorization: verify user is enrolled or platform admin
  const enrollment = await dataStore.getUserEnrollment(session.user.id, courseId);
  if (!enrollment && session.role !== "admin") {
    return { success: false, error: "Active enrollment required to record progress" };
  }

  try {
    const result = await dataStore.markLessonProgress(
      session.user.id,
      lessonId,
      courseId,
      undefined,
      timeSpentSeconds,
      playbackPositionSeconds
    );
    return { success: true, progress: result.progress };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save playback position" };
  }
}

export async function submitQuizAction(quizId: string, courseId: string, answers: Record<string, string>) {
  const session = await getCurrentSession();
  if (!session.user) {
    return { success: false, error: "Authentication required" };
  }

  // Server-side authorization: verify user is enrolled or platform admin
  const enrollment = await dataStore.getUserEnrollment(session.user.id, courseId);
  if (!enrollment && session.role !== "admin") {
    return { success: false, error: "Active enrollment required to submit assessment" };
  }

  try {
    const result = await dataStore.submitQuiz(session.user.id, quizId, answers);

    // If passed, issue certificate if course has certificate_enabled
    let certificate = null;
    if (result.isPassed) {
      const course = await dataStore.getCourseById(courseId);
      if (course?.certificate_enabled) {
        certificate = await dataStore.issueCertificate(session.user.id, courseId);
      }
    }

    revalidatePath(`/dashboard`);
    revalidatePath(`/learn`);
    return {
      success: true,
      scorePercentage: result.scorePercentage,
      isPassed: result.isPassed,
      feedback: result.feedback,
      certificateCode: certificate?.certificate_code || null,
    };
  } catch (err: any) {
    return { success: false, error: err.message || "Quiz evaluation failed" };
  }
}
