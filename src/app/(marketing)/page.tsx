import { SchoolLanding } from "@/components/home/school-landing";

export const metadata = {
  title: "Teacher Home Secondary School | Lokoja",
  description:
    "Educate A Child & Build A Virile Nation. Quality, technology-integrated secondary education from JSS1 to SSS3 in Peace Community, Lokoja, Kogi State.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <SchoolLanding />
    </main>
  );
}
