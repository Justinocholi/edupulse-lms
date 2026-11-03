import Link from "next/link";
import { Sparkles, BookOpen, Video, ShieldCheck, Award, MessageSquare, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About EduPulse LMS | Modern, Distraction-Free Learning Platform",
  description:
    "Our mission is to establish the gold standard for production software engineering learning through structured courses, live cohorts, and verifiable credentials.",
};

export default function AboutPage() {
  const pillars = [
    {
      title: "Distraction-Free Focus",
      description:
        "Learning complex concepts requires sustained attention. EduPulse removes advertising, distracting notifications, and superficial clickbait to give developers a serene, high-bandwidth environment.",
      icon: BookOpen,
    },
    {
      title: "Live Cohorts & Accountability",
      description:
        "Self-paced learning is elevated when paired with synchronous cohorts. Our live batches provide scheduled Zoom classes, office hours, and peer cohorts to keep learners accountable.",
      icon: Video,
    },
    {
      title: "Server-Evaluated Mastery",
      description:
        "Instead of cosmetic checkboxes, skill acquisition is validated through strict server-graded assessments that never leak answer keys to the client browser.",
      icon: ShieldCheck,
    },
    {
      title: "Verifiable Digital Credentials",
      description:
        "Every certificate issued is assigned a permanent, tamper-evident cryptographic hash. Hiring teams can verify authenticity directly in our public certificate registry.",
      icon: Award,
    },
  ];

  return (
    <div className="container mx-auto py-16 px-4 md:px-6 max-w-5xl space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-700 dark:text-brand-300">
          <Sparkles className="h-3.5 w-3.5" />
          The EduPulse Philosophy
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Built for Software Architects Who Build What&apos;s Next
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          EduPulse was engineered to bridge the widening chasm between superficial framework tutorials and genuine enterprise-grade engineering. Modeled after the architectural clarity of Frappe LMS, we empower engineers worldwide.
        </p>
      </div>

      {/* Grid of Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div key={idx} className="rounded-2xl border border-border bg-card p-8 space-y-4 shadow-sm hover:border-brand-500/40 transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                {p.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                {p.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Community Callout */}
      <div className="rounded-3xl border border-border bg-muted/30 p-8 md:p-12 space-y-6">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            An Open Ecosystem for Technical Minds
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Whether you are preparing for staff-level systems design interviews, architecting cloud Kubernetes clusters, or launching generative AI applications, EduPulse is your dedicated learning home.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link href="/courses">
            <Button size="lg" className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs">
              Explore Masterclasses
            </Button>
          </Link>
          <Link href="/batches">
            <Button size="lg" variant="outline" className="rounded-xl border-border font-bold text-xs">
              Browse Live Batches
            </Button>
          </Link>
          <Link href="/discussions">
            <Button size="lg" variant="ghost" className="rounded-xl font-bold text-xs text-muted-foreground hover:text-foreground">
              Join Community Discussions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
