import Link from "next/link";
import { GraduationCap, Shield, CheckCircle, ExternalLink, ArrowRight, Video, Award, BookOpen } from "lucide-react";

export const metadata = {
  title: "EduPulse Portals Gateway | Student Dashboard & Staff Console",
  description:
    "Direct gateway to your EduPulse Student Dashboard, Live Cohorts, Certificates, and Administration Console.",
};

export default function PortalPage() {
  return (
    <div className="container mx-auto py-16 px-4 md:px-6 max-w-5xl space-y-16">
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          EduPulse Access Gateways
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground">
          Platform Portals
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Access your enrolled learning paths, live Zoom cohort sessions, quizzes, verified certificates, or log into the administrative management console.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Student Portal Card */}
        <div className="rounded-3xl border-2 border-brand-500/30 bg-card p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-brand-600 to-teal-400 absolute top-0 left-0 right-0" />
          <div className="h-14 w-14 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center">
            <GraduationCap className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-extrabold text-foreground">
              Student Learning Hub
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Resume your active courses, access scheduled live classes, review automated quiz attempts, and download verifiable certificates.
            </p>
          </div>

          <div className="space-y-2.5 text-xs text-foreground font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-brand-600" />
              <span>Distraction-free lesson player with auto-saved notes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-brand-600" />
              <span>Live Zoom cohort batch classrooms and timetables</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-brand-600" />
              <span>Verifiable digital certificates and score transcripts</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white px-5 py-3 text-xs font-bold shadow-md transition"
            >
              <span>Open Student Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Staff / Admin Portal Card */}
        <div className="rounded-3xl border-2 border-slate-700/30 bg-card p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-slate-700 to-slate-900 absolute top-0 left-0 right-0" />
          <div className="h-14 w-14 rounded-2xl bg-slate-800 text-white flex items-center justify-center">
            <Shield className="h-7 w-7 text-brand-400" />
          </div>

          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-extrabold text-foreground">
              Administration Console
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Curriculum authoring, live batch scheduling, user role management, assessment evaluation, and security audit telemetry.
            </p>
          </div>

          <div className="space-y-2.5 text-xs text-foreground font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-brand-500" />
              <span>Full curriculum &amp; module management</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-brand-500" />
              <span>Live cohort batch creation &amp; Zoom URL dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-brand-500" />
              <span>Role-based access control &amp; audit logging</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/admin"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 text-xs font-bold shadow-md transition"
            >
              <span>Open Admin Console</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
