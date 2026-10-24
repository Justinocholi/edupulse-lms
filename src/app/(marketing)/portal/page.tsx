import Link from "next/link";
import { GraduationCap, Shield, CheckCircle, ExternalLink, ArrowRight } from "lucide-react";

export const metadata = {
  title: "School Portal & Result Checking | Teacher Home Secondary School",
  description:
    "Secure online access to student examination results, report cards, class rosters, and staff administration console.",
};

export default function PortalPage() {
  return (
    <div className="container mx-auto py-16 px-6 max-w-5xl space-y-16">
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#003366] dark:text-[#66b2ff]">
          Secure School Portals
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-[#003366] dark:text-white">
          Results and records, securely online
        </h1>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The Teacher Home portals give students, parents, and authorized faculty a simple, secure way to check released termly examination results, print report sheets, and manage academic data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Student Portal Card */}
        <div className="rounded-3xl border-2 border-[#990033]/30 bg-card p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-[#990033] to-[#7a0029] absolute top-0 left-0 right-0" />
          <div className="h-14 w-14 rounded-2xl bg-[#fff0f3] dark:bg-slate-800 text-[#990033] flex items-center justify-center">
            <GraduationCap className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-extrabold text-[#003366] dark:text-white">
              Student &amp; Parent Portal
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Check continuous assessment and termly examination results, download official report sheets, and review enrolled learning materials.
            </p>
          </div>

          <div className="space-y-2.5 text-xs text-foreground font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#990033]" />
              <span>Instant term examination result checker</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#990033]" />
              <span>Digital report card download &amp; printing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#990033]" />
              <span>Subject timetable &amp; interactive quizzes</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#990033] to-[#7a0029] text-white px-5 py-3 text-xs font-bold shadow-md hover:opacity-95 transition"
            >
              <span>Open Student Portal</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <a
              href="https://school-website-one-umber.vercel.app/student-login"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-3 text-xs font-bold text-muted-foreground hover:text-foreground transition"
            >
              <span>External Result Check</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Staff Portal Card */}
        <div className="rounded-3xl border-2 border-[#003366]/30 bg-card p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-[#003366] to-[#004a99] absolute top-0 left-0 right-0" />
          <div className="h-14 w-14 rounded-2xl bg-[#e9f5ff] dark:bg-slate-800 text-[#003366] dark:text-[#66b2ff] flex items-center justify-center">
            <Shield className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-extrabold text-[#003366] dark:text-white">
              Staff &amp; Admin Console
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Collate continuous assessment scores, manage registered student identities, publish bulletin updates, and configure school parameters.
            </p>
          </div>

          <div className="space-y-2.5 text-xs text-foreground font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#003366] dark:text-[#66b2ff]" />
              <span>Student record &amp; enrollment registry</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#003366] dark:text-[#66b2ff]" />
              <span>CA score collation &amp; grade management</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#003366] dark:text-[#66b2ff]" />
              <span>Security audit telemetry &amp; staff permissions</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/admin"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#003366] to-[#002a54] text-white px-5 py-3 text-xs font-bold shadow-md hover:bg-[#002244] transition"
            >
              <span>Open Staff Portal</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <a
              href="https://school-website-one-umber.vercel.app/admin-login"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-3 text-xs font-bold text-muted-foreground hover:text-foreground transition"
            >
              <span>External Admin Gateway</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
