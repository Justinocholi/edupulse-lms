import { dataStore } from "@/lib/db/data-store";
import { CourseForm } from "@/components/admin/course-form";

export const metadata = {
  title: "Create Masterclass Blueprint | EduPulse Admin",
};

export default async function NewCoursePage() {
  const categories = await dataStore.getCategories();

  return (
    <div className="space-y-6">
      <CourseForm categories={categories} />
    </div>
  );
}
