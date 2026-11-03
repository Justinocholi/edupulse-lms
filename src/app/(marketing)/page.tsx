import { LMSLanding } from "@/components/home/lms-landing";
import { dataStore } from "@/lib/db/data-store";

export const metadata = {
  title: "EduPulse LMS | Modern, Distraction-Free Learning Platform",
  description:
    "Master production software engineering with structured curriculums, live Zoom cohorts, distraction-free reading, and verifiable certificates.",
};

export default async function HomePage() {
  const [courses, batches, discussions, categories] = await Promise.all([
    dataStore.getCourses({ sort: "popular" }),
    dataStore.getBatches(),
    dataStore.getDiscussions(),
    dataStore.getCategories(),
  ]);

  return (
    <main className="min-h-screen flex flex-col">
      <LMSLanding
        courses={courses}
        batches={batches}
        discussions={discussions}
        categories={categories}
      />
    </main>
  );
}
