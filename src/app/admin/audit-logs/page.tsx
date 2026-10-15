import { ShieldAlert, Activity } from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Security Audit Logs | EduPulse Admin",
};

export default async function AdminAuditLogsPage() {
  const logs = await dataStore.getAuditLogs();

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
          Platform Security Audit Trail
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Immutable audit log recording sensitive actions: course status mutations, administrative role grants, and curriculum deletions.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border/80 text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Action</th>
                <th className="p-4">Entity Type</th>
                <th className="p-4">Entity ID</th>
                <th className="p-4">IP Address</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {logs.map((log) => {
                const formattedDate = new Date(log.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });
                return (
                  <tr key={log.id} className="hover:bg-muted/30 transition">
                    <td className="p-4 font-mono font-bold text-brand-600 dark:text-brand-400">
                      {log.action}
                    </td>
                    <td className="p-4 uppercase font-semibold text-muted-foreground text-[10px]">
                      {log.entity_type}
                    </td>
                    <td className="p-4 font-mono text-muted-foreground max-w-xs truncate">
                      {log.entity_id}
                    </td>
                    <td className="p-4 font-mono text-muted-foreground">{log.ip_address}</td>
                    <td className="p-4 text-muted-foreground">{formattedDate}</td>
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
