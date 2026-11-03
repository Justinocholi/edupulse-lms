"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";

export async function createBatchAdminAction(formData: FormData) {
  await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const courseId = formData.get("course_id") as string;
  const liveClassUrl = (formData.get("live_class_url") as string)?.trim();
  const liveScheduleDescription = (formData.get("live_schedule_description") as string)?.trim();
  const maxSeats = Number(formData.get("max_seats")) || 40;
  const startDate = (formData.get("start_date") as string) || new Date().toISOString();
  const endDate = (formData.get("end_date") as string) || new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString();
  const status = (formData.get("status") as "upcoming" | "ongoing" | "completed") || "upcoming";

  if (!title || !courseId) {
    return { success: false, error: "Please provide both a batch title and an associated course." };
  }

  await dataStore.createBatch({
    title,
    course_id: courseId,
    live_class_url: liveClassUrl || "https://zoom.us/j/teacher-home-cohort",
    live_schedule_description: liveScheduleDescription || "Saturdays 10:00 AM WAT",
    max_seats: maxSeats,
    start_date: startDate,
    end_date: endDate,
    status,
    enrolled_count: 0,
    announcements: [],
  });

  revalidatePath("/admin/batches");
  revalidatePath("/batches");
  return { success: true };
}

export async function deleteBatchAdminAction(batchId: string) {
  await requireAdmin();
  await dataStore.deleteBatch(batchId);
  revalidatePath("/admin/batches");
  revalidatePath("/batches");
  return { success: true };
}
