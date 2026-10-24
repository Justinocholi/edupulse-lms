import Link from "next/link";
import { CheckCircle, ArrowRight, ShieldCheck, Award, Users, BookOpen } from "lucide-react";

export const metadata = {
  title: "About Us | Teacher Home Secondary School Lokoja",
  description:
    "Rooted in Peace Community, Lokoja and focused on the future, we help young people build knowledge, character and courage.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-6 max-w-5xl space-y-16">
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-[#003366] dark:text-[#66b2ff]">
          Our Legacy &amp; Mission
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-[#003366] dark:text-white">
          A school built around every learner
        </h1>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Rooted in Peace Community, Lokoja and focused on the future, we help young people build knowledge, character and courage from JSS1 through SSS3.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <h2 className="font-heading text-2xl font-bold text-[#003366] dark:text-white">
            Purposeful Education in the Heart of Lokoja
          </h2>
          <p>
            Teacher Home Secondary School was established to give families a trusted environment where strong academics and sound moral values grow together.
          </p>
          <p>
            Today, our community serves approximately 180 to 200 learners through the Nigerian Educational Curriculum, enriched with practical technology, co-curricular experiences and intentional character formation.
          </p>
          <div className="pt-2 flex gap-4">
            <Link
              href="/#admissions"
              className="inline-flex items-center gap-2 rounded-xl bg-[#990033] text-white px-5 py-3 text-xs font-bold shadow-md hover:opacity-90 transition"
            >
              <span>Join Our Community</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/classroom.png"
            alt="Teacher Home School Facilities"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="rounded-2xl border border-[#003366]/20 bg-card p-6 space-y-3 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[#990033]">Our Mission</span>
          <h3 className="font-heading text-lg font-bold text-foreground">Equipping Every Child</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            To provide quality, technology-integrated education that nurtures intellectual curiosity, moral integrity, and practical skills.
          </p>
        </div>

        <div className="rounded-2xl border border-[#003366]/20 bg-card p-6 space-y-3 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[#003366] dark:text-[#66b2ff]">Our Vision</span>
          <h3 className="font-heading text-lg font-bold text-foreground">Virile Nation Builders</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            To be Kogi State’s most trusted secondary institution, raising leaders who excel academically and contribute strength to our nation.
          </p>
        </div>

        <div className="rounded-2xl border border-[#003366]/20 bg-card p-6 space-y-3 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[#990033]">Our Core Values</span>
          <h3 className="font-heading text-lg font-bold text-foreground">Values-Led Discipline</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Excellence, Integrity, Discipline, Technology Integration, Empathy, and Community Service guide our conduct.
          </p>
        </div>
      </div>
    </div>
  );
}
