"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";
import { courseSchema } from "@/lib/validations/course";
import { CourseStatus } from "@/types";

export async function createCourseAction(formData: FormData) {
  const session = await requireAdmin();

  const raw = {
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
    category_id: formData.get("category_id"),
    difficulty: formData.get("difficulty"),
    status: formData.get("status") || "draft",
    thumbnail_url: formData.get("thumbnail_url"),
    trailer_video_url: formData.get("trailer_video_url"),
    price: formData.get("price"),
    is_free: formData.get("is_free") === "true",
    estimated_duration_minutes: formData.get("estimated_duration_minutes"),
    learning_outcomes: formData.get("learning_outcomes")
      ? JSON.parse(formData.get("learning_outcomes") as string)
      : [],
    prerequisites: formData.get("prerequisites")
      ? JSON.parse(formData.get("prerequisites") as string)
      : [],
    target_audience: formData.get("target_audience")
      ? JSON.parse(formData.get("target_audience") as string)
      : [],
    passing_grade_percentage: formData.get("passing_grade_percentage") || 75,
    certificate_enabled: formData.get("certificate_enabled") !== "false",
  };

  const parsed = courseSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message || "Validation failed" };
  }

  try {
    const course = await dataStore.createCourse(parsed.data, session.user!.id);
    revalidatePath("/admin/courses");
    revalidatePath("/courses");
    return { success: true, courseId: course.id };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create course" };
  }
}

export async function updateCourseAction(courseId: string, formData: FormData) {
  const session = await requireAdmin();

  const raw = {
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    description: formData.get("description"),
    category_id: formData.get("category_id"),
    difficulty: formData.get("difficulty"),
    status: formData.get("status"),
    thumbnail_url: formData.get("thumbnail_url"),
    trailer_video_url: formData.get("trailer_video_url"),
    price: formData.get("price"),
    is_free: formData.get("is_free") === "true",
    estimated_duration_minutes: formData.get("estimated_duration_minutes"),
    learning_outcomes: formData.get("learning_outcomes")
      ? JSON.parse(formData.get("learning_outcomes") as string)
      : [],
    prerequisites: formData.get("prerequisites")
      ? JSON.parse(formData.get("prerequisites") as string)
      : [],
    target_audience: formData.get("target_audience")
      ? JSON.parse(formData.get("target_audience") as string)
      : [],
    passing_grade_percentage: formData.get("passing_grade_percentage"),
    certificate_enabled: formData.get("certificate_enabled") !== "false",
  };

  const parsed = courseSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message || "Validation failed" };
  }

  try {
    const updated = await dataStore.updateCourse(courseId, parsed.data, session.user!.id);
    revalidatePath("/admin/courses");
    revalidatePath("/courses");
    return { success: true, course: updated };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update course" };
  }
}

export async function setCourseStatusAction(courseId: string, status: CourseStatus) {
  const session = await requireAdmin();
  try {
    await dataStore.updateCourse(courseId, { status }, session.user!.id);
    revalidatePath("/admin/courses");
    revalidatePath("/courses");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update status" };
  }
}

export async function deleteCourseAction(courseId: string) {
  const session = await requireAdmin();
  try {
    const deleted = await dataStore.deleteCourse(courseId, session.user!.id);
    revalidatePath("/admin/courses");
    revalidatePath("/courses");
    return { success: deleted };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete course" };
  }
}

export async function duplicateCourseAction(courseId: string) {
  const session = await requireAdmin();
  try {
    const original = await dataStore.getCourseById(courseId);
    if (!original) return { success: false, error: "Course not found" };

    const duplicated = await dataStore.createCourse(
      {
        ...original,
        title: `${original.title} (Copy)`,
        slug: `${original.slug}-copy-${Date.now()}`,
        status: "draft",
      },
      session.user!.id
    );

    revalidatePath("/admin/courses");
    return { success: true, newCourseId: duplicated.id };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to duplicate course" };
  }
}

// Module & Lesson CRUD actions
export async function createModuleAction(courseId: string, title: string, description?: string) {
  await requireAdmin();
  try {
    const mod = await dataStore.createModule(courseId, title, description);
    revalidatePath(`/admin/courses/${courseId}/builder`);
    return { success: true, module: mod };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteModuleAction(courseId: string, moduleId: string) {
  await requireAdmin();
  try {
    await dataStore.deleteModule(moduleId);
    revalidatePath(`/admin/courses/${courseId}/builder`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateModuleAction(courseId: string, moduleId: string, title: string, description?: string) {
  await requireAdmin();
  try {
    const updated = await dataStore.updateModule(moduleId, { title, description });
    revalidatePath(`/admin/courses/${courseId}/builder`);
    return { success: true, module: updated };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function reorderModulesAction(courseId: string, orderedModuleIds: string[]) {
  await requireAdmin();
  try {
    await dataStore.reorderModules(courseId, orderedModuleIds);
    revalidatePath(`/admin/courses/${courseId}/builder`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createLessonAction(courseId: string, moduleId: string, data: any) {
  await requireAdmin();
  try {
    const lesson = await dataStore.createLesson(moduleId, data);
    revalidatePath(`/admin/courses/${courseId}/builder`);
    return { success: true, lesson };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateLessonAction(courseId: string, lessonId: string, data: any) {
  await requireAdmin();
  try {
    const updated = await dataStore.updateLesson(lessonId, data);
    revalidatePath(`/admin/courses/${courseId}/builder`);
    return { success: true, lesson: updated };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteLessonAction(courseId: string, lessonId: string) {
  await requireAdmin();
  try {
    await dataStore.deleteLesson(lessonId);
    revalidatePath(`/admin/courses/${courseId}/builder`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function reorderLessonsAction(courseId: string, moduleId: string, orderedLessonIds: string[]) {
  await requireAdmin();
  try {
    await dataStore.reorderLessons(moduleId, orderedLessonIds);
    revalidatePath(`/admin/courses/${courseId}/builder`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
