import Link from "next/link";
import { Award, ShieldCheck, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import { requireAuth } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "My Certificates | EduPulse",
  description: "View and share your earned verified course credentials.",
};

export default async function StudentCertificatesPage() {
  const session = await requireAuth();
  const certificates = await dataStore.getUserCertificates(session.user!.id);

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <Award className="h-4 w-4" />
          <span>Credential Vault</span>
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-foreground">
          My Verified Certificates
        </h1>
        <p className="text-sm text-muted-foreground">
          All certificates generated on EduPulse possess cryptographic verification hashes and public landing pages for resume and LinkedIn verification.
        </p>
      </div>

      <div className="space-y-4">
        {certificates.length > 0 ? (
          certificates.map((cert) => {
            const formattedDate = new Date(cert.issue_date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            return (
              <div
                key={cert.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-emerald-500/40 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 shrink-0">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <Badge variant="success" className="font-mono text-[11px]">
                      {cert.certificate_code}
                    </Badge>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {cert.course_title}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        Issued on {formattedDate}
                      </span>
                      <span>•</span>
                      <span>Grade: {cert.final_grade_percentage || 100}%</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Link href={`/certificates/${cert.certificate_code}`} target="_blank">
                    <Button variant="default" size="sm" className="rounded-xl">
                      <span>View Credential</span>
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-3">
            <Award className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="font-bold text-base text-foreground">No certificates earned yet</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Complete 100% of the lessons and pass the final course assessment with a passing grade to unlock your verified credential.
            </p>
            <Link href="/dashboard/my-learning">
              <Button variant="outline" size="sm">
                Continue Courses
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
