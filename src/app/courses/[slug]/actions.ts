"use server";

import { getCurrentSession } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";
import { revalidatePath } from "next/cache";

export async function enrollInCourseAction(courseId: string) {
  const session = await getCurrentSession();
  if (!session.user) {
    return { success: false, error: "Please log in to enroll in this course" };
  }

  try {
    await dataStore.enrollUser(session.user.id, courseId);
    revalidatePath("/dashboard");
    revalidatePath("/courses");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Enrollment failed" };
  }
}
