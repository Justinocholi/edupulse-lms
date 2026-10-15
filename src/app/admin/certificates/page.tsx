import Link from "next/link";
import { Award, ShieldCheck, ExternalLink, Calendar } from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Certificates Registry | EduPulse Admin",
};

export default async function AdminCertificatesPage() {
  const allUsers = await dataStore.getUsers();
  const certsArrays = await Promise.all(allUsers.map((u) => dataStore.getUserCertificates(u.id)));
  const allCertificates = certsArrays.flat();

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
          Certificates Registry
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Audit cryptographically authenticated completion credentials issued across all active masterclasses.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border/80 text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Certificate Code</th>
                <th className="p-4">Recipient</th>
                <th className="p-4">Course</th>
                <th className="p-4">Grade</th>
                <th className="p-4">Issue Date</th>
                <th className="p-4 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {allCertificates.map((cert) => {
                const formattedDate = new Date(cert.issue_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
                return (
                  <tr key={cert.id} className="hover:bg-muted/30 transition">
                    <td className="p-4 font-mono font-bold text-brand-600 dark:text-brand-400">
                      {cert.certificate_code}
                    </td>
                    <td className="p-4 font-semibold text-foreground">
                      {cert.recipient_name}
                    </td>
                    <td className="p-4 text-muted-foreground max-w-xs truncate">
                      {cert.course_title}
                    </td>
                    <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">
                      {cert.final_grade_percentage || 100}%
                    </td>
                    <td className="p-4 text-muted-foreground">{formattedDate}</td>
                    <td className="p-4 text-right">
                      <Link href={`/certificates/${cert.certificate_code}`} target="_blank">
                        <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs">
                          <span>Inspect</span>
                          <ExternalLink className="ml-1 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
