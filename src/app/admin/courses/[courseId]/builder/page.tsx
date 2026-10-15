import { notFound } from "next/navigation";
import { dataStore } from "@/lib/db/data-store";
import { CurriculumBuilder } from "@/components/admin/curriculum-builder";

interface CourseBuilderPageProps {
  params: {
    courseId: string;
  };
}

export const metadata = {
  title: "Curriculum Builder | EduPulse Admin",
};

export default async function CourseBuilderPage({ params }: CourseBuilderPageProps) {
  const course = await dataStore.getCourseById(params.courseId);
  if (!course) {
    notFound();
  }

  return <CurriculumBuilder course={course} />;
}
