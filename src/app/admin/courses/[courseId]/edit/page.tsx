import { notFound } from "next/navigation";
import { dataStore } from "@/lib/db/data-store";
import { CourseForm } from "@/components/admin/course-form";

interface EditCoursePageProps {
  params: {
    courseId: string;
  };
}

export const metadata = {
  title: "Edit Masterclass | EduPulse Admin",
};

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const course = await dataStore.getCourseById(params.courseId);
  if (!course) {
    notFound();
  }

  const categories = await dataStore.getCategories();

  return (
    <div className="space-y-6">
      <CourseForm categories={categories} initialData={course} />
    </div>
  );
}
