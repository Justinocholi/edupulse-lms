import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MoveLeft,
  GraduationCap,
} from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CertificateActions } from "./certificate-actions";

interface CertificateVerifyProps {
  params: {
    code: string;
  };
}

export async function generateMetadata({ params }: CertificateVerifyProps) {
  const cert = await dataStore.getCertificateByCode(params.code);
  if (!cert) return { title: "Certificate Not Found" };
  return {
    title: `Verified Certificate: ${cert.recipient_name} | Teacher Home LMS`,
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
          <span className="font-mono font-semibold text-foreground">{params.code}</span>. Please check the code or verify in our registry.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Link href="/certificates">
            <Button variant="outline" size="sm">
              <MoveLeft className="mr-2 h-4 w-4" />
              Certificate Registry
            </Button>
          </Link>
          <Link href="/courses">
            <Button size="sm" className="bg-[#003366] text-white">
              Explore Courses
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 print:hidden">
        <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-bold text-sm sm:text-base">Official Verified Credential</h2>
            <p className="text-xs text-muted-foreground">
              Authenticated on Teacher Home Secondary School immutable registry. Tamper-evident academic record.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="success" className="font-mono text-xs">
            {cert.certificate_code}
          </Badge>
          <CertificateActions code={cert.certificate_code} />
        </div>
      </div>

      {/* Official Certificate Canvas Frame */}
      <div className="relative rounded-3xl border-8 border-double border-[#003366]/30 bg-gradient-to-b from-[#faf7f2] via-card to-[#f4f9fe] dark:from-[#0a1320] dark:via-[#001f3f]/40 dark:to-[#0a1320] p-8 md:p-14 shadow-2xl text-center overflow-hidden">
        {/* Subtle Watermark seal */}
        <div className="absolute -right-16 -bottom-16 opacity-5 pointer-events-none">
          <Award className="h-96 w-96 text-[#003366]" />
        </div>

        {/* Certificate Branding Header */}
        <div className="flex flex-col items-center justify-center gap-2 mb-6">
          <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-tr from-[#003366] to-[#004a99] p-1.5 shadow-md border border-[#990033] flex items-center justify-center overflow-hidden mb-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo.png"
              alt="Teacher Home Crest"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-[#003366] dark:text-white">
            Teacher Home Secondary School
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#990033] dark:text-[#ff6685]">
            Peace Community, Lokoja, Kogi State • EduPulse LMS
          </span>
          <p className="text-[10px] italic text-muted-foreground">
            &ldquo;Educate A Child &amp; Build A Virile Nation&rdquo;
          </p>
        </div>

        <div className="inline-block border-y border-[#990033]/30 py-1.5 px-6 my-2">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#990033] dark:text-[#ff6685]">
            Certificate of Completion &amp; Academic Merit
          </p>
        </div>

        <p className="text-xs text-muted-foreground mt-4 mb-2">
          This is proudly conferred upon
        </p>

        <h3 className="font-heading text-3xl md:text-5xl font-extrabold text-[#003366] dark:text-white tracking-tight my-4">
          {cert.recipient_name}
        </h3>

        <p className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed mb-6">
          for successfully satisfying all curriculum milestones, laboratory demonstrations, and passing the rigorous assessment examinations in
        </p>

        <div className="my-6 inline-block rounded-2xl border border-[#003366]/30 bg-[#003366]/5 dark:bg-[#003366]/20 px-8 py-4">
          <h4 className="font-heading text-xl md:text-2xl font-bold text-[#003366] dark:text-[#66b2ff]">
            {cert.course_title}
          </h4>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          Final Assessment Grade:{" "}
          <span className="font-bold text-foreground">
            {cert.final_grade_percentage ? `${cert.final_grade_percentage.toFixed(0)}%` : "100%"} (Distinction with Honors)
          </span>
        </p>

        {/* Certificate Signatures & Code Footer */}
        <div className="mt-12 pt-8 border-t border-border/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-end text-xs text-muted-foreground">
          <div className="space-y-1">
            <div className="font-serif italic text-base text-foreground font-semibold">
              {cert.instructor_name}
            </div>
            <p className="text-[11px] uppercase tracking-wider font-semibold">Lead Instructor / Principal</p>
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
            <p className="text-[11px] uppercase tracking-wider font-semibold">Date of Official Issuance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
