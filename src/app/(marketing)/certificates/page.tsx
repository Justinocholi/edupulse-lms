import Link from "next/link";
import {
  Award,
  ShieldCheck,
  Search,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Lock,
} from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CertificateLookupForm } from "./certificate-lookup-form";

export const metadata = {
  title: "Official Certificate Verification Registry | EduPulse LMS",
  description:
    "Verify the authenticity of professional engineering certifications, masterclass credentials, and diplomas issued by EduPulse LMS.",
};

export default async function CertificatesRegistryPage() {
  const sampleCertificates = await dataStore.getCertificates();

  return (
    <div className="container py-12 px-4 md:px-6 space-y-12 max-w-5xl mx-auto">
      {/* 1. Header Banner */}
      <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-r from-brand-950 via-slate-900 to-amber-950 text-white p-8 md:p-12 shadow-xl text-center space-y-4 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-amber-300 border border-white/10">
          <ShieldCheck className="h-4 w-4" />
          <span>Frappe LMS Standard Credential Verification</span>
        </div>

        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Certificate Validation Registry
        </h1>

        <p className="text-sm md:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
          Every certificate issued by EduPulse Academy is cryptographically logged on our immutable academic registry with a unique tamper-evident verification code.
        </p>

        {/* Verification Lookup Input */}
        <div className="pt-4 max-w-xl mx-auto">
          <CertificateLookupForm />
        </div>
      </div>

      {/* 2. Security & Verification Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="font-heading font-bold text-sm text-foreground">
            Tamper-Proof Verification
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Unique sequential hashes prevent credential falsification. Employers and technical recruiters can verify curriculum mastery in real time.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="font-heading font-bold text-sm text-foreground">
            Academic Rigor &amp; Distinction
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Issued exclusively upon completing all laboratory assignments and passing server-graded comprehensive assessments with distinction.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="font-heading font-bold text-sm text-foreground">
            Permanent Digital Ledger
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Credentials remain accessible online indefinitely for lifetime portfolio sharing, LinkedIn accreditation, and technical background checks.
          </p>
        </div>
      </div>

      {/* 3. Sample Verified Credentials */}
      {sampleCertificates.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <h2 className="font-heading text-lg font-bold text-foreground">
              Recent Verified Credentials
            </h2>
            <span className="text-xs text-muted-foreground">
              Public Ledger View
            </span>
          </div>

          <div className="divide-y divide-border/60 rounded-2xl border border-border bg-card overflow-hidden">
            {sampleCertificates.slice(0, 5).map((cert) => (
              <div
                key={cert.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-foreground text-sm">
                      {cert.recipient_name}
                    </span>
                    <span className="text-muted-foreground">
                      {cert.course_title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="success" className="font-mono text-[11px]">
                    {cert.certificate_code}
                  </Badge>
                  <Link href={`/certificates/${cert.certificate_code}`}>
                    <Button variant="outline" size="sm" className="rounded-xl text-xs">
                      <span>View Credential</span>
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
