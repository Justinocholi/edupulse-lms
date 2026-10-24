import { SchoolLanding } from "@/components/home/school-landing";

export const metadata = {
  title: "Admissions 2026/2027 | Teacher Home Secondary School",
  description:
    "Join Teacher Home Secondary School in Peace Community, Lokoja. Enrolment is currently open for JSS1 to SSS2.",
};

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen">
      <SchoolLanding />
    </main>
  );
}
