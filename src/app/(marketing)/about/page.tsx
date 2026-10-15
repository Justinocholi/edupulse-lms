import { Sparkles, Shield, Cpu, Users } from "lucide-react";

export const metadata = {
  title: "About EduPulse | High-Throughput Engineering Education",
  description: "Our mission is to establish the gold standard for production software engineering learning.",
};

export default function AboutPage() {
  return (
    <div className="container py-16 px-4 max-w-4xl space-y-12">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-700 dark:text-teal-300">
          <Sparkles className="h-3.5 w-3.5" />
          The EduPulse Philosophy
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Built for Software Architects Who Build What&apos;s Next
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          We founded EduPulse to bridge the widening chasm between superficial framework tutorials and genuine enterprise-grade engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
          <h3 className="font-bold text-lg text-foreground">Deep Architectural Rigor</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every curriculum item on EduPulse is designed around actual production codebases, PostgreSQL security policies, distributed caching, and zero-trust authentication.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
          <h3 className="font-bold text-lg text-foreground">Authentic Assessments</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Knowledge is verified through strictly evaluated server-side assessments, preventing answers from leaking to the browser and ensuring genuine skill acquisition.
          </p>
        </div>
      </div>
    </div>
  );
}
