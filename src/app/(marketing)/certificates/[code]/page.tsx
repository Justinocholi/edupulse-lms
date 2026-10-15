import { notFound } from "next/navigation";
import Link from "next/link";
import { Award, ShieldCheck, CheckCircle2, Printer, Share2, Sparkles, MoveLeft } from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CertificateVerifyProps {
  params: {
    code: string;
  };
}

export async function generateMetadata({ params }: CertificateVerifyProps) {
  const cert = await dataStore.getCertificateByCode(params.code);
  if (!cert) return { title: "Certificate Not Found" };
  return {
    title: `Verified Certificate: ${cert.recipient_name} | EduPulse`,
    description: `Official verified certificate for ${cert.recipient_name} completing ${cert.course_title}.`,
  };
}

export default async function CertificateVerifyPage({ params }: CertificateVerifyProps) {
  const cert = await dataStore.getCertificateByCode(params.code);

  if (!cert) {
    return (
      <div className="container py-20 px-4 text-center max-w-md mx-auto space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <Award className="h-8 w-8" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Certificate Unverified
        </h1>
        <p className="text-sm text-muted-foreground">
          No active verified record exists matching certificate code{" "}
          <span className="font-mono font-semibold text-foreground">{params.code}</span>. Please verify the identifier and try again.
        </p>
        <div className="pt-4">
          <Link href="/courses">
            <Button variant="outline" size="sm">
              <MoveLeft className="mr-2 h-4 w-4" />
              Explore Valid Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const issueDateFormatted = new Date(cert.issue_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="container py-12 px-4 max-w-4xl space-y-8">
      {/* Verification Header Badge */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
        <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-bold text-sm sm:text-base">Official Verified Credential</h2>
            <p className="text-xs text-muted-foreground">
              Authenticated on the EduPulse immutable registry. Tamper-evident record.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="success" className="font-mono text-xs">
            {cert.certificate_code}
          </Badge>
        </div>
      </div>

      {/* Official Certificate Canvas Frame */}
      <div className="relative rounded-3xl border-4 border-brand-500/20 bg-gradient-to-b from-card via-card to-brand-950/[0.03] p-8 md:p-14 shadow-2xl text-center overflow-hidden">
        {/* Subtle Watermark seal */}
        <div className="absolute -right-16 -bottom-16 opacity-5 pointer-events-none">
          <Award className="h-96 w-96 text-brand-600" />
        </div>

        {/* Certificate Branding Header */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 text-white shadow-md">
            <Sparkles className="h-6 w-6 fill-current" />
          </div>
          <span className="font-heading text-2xl font-black tracking-tight text-foreground">
            Edu<span className="text-teal-500">Pulse</span> Academy
          </span>
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
          Certificate of Completion
        </p>

        <h3 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground tracking-tight my-4">
          {cert.recipient_name}
        </h3>

        <p className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed mb-6">
          has successfully satisfied all rigorous curriculum milestones, laboratory demonstrations, and server-graded assessments for
        </p>

        <div className="my-6 inline-block rounded-2xl border border-brand-500/30 bg-brand-500/5 px-6 py-4">
          <h4 className="font-heading text-xl md:text-2xl font-bold text-brand-600 dark:text-brand-400">
            {cert.course_title}
          </h4>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          Final Assessment Grade:{" "}
          <span className="font-semibold text-foreground">
            {cert.final_grade_percentage ? `${cert.final_grade_percentage.toFixed(0)}%` : "100%"} (Distinction)
          </span>
        </p>

        {/* Certificate Signatures & Code Footer */}
        <div className="mt-12 pt-8 border-t border-border/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-end text-xs text-muted-foreground">
          <div className="space-y-1">
            <div className="font-serif italic text-base text-foreground font-semibold">
              {cert.instructor_name}
            </div>
            <p className="text-[11px] uppercase tracking-wider">Faculty Lead</p>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Award className="h-7 w-7" />
            </div>
            <span className="font-mono font-bold text-foreground text-[11px]">
              {cert.certificate_code}
            </span>
          </div>

          <div className="space-y-1 md:text-right">
            <p className="font-semibold text-foreground">{issueDateFormatted}</p>
            <p className="text-[11px] uppercase tracking-wider">Date of Issuance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
