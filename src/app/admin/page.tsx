import Link from "next/link";
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  ShieldCheck,
  PlusCircle,
  ArrowRight,
  Eye,
  Activity,
  Layers,
} from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnalyticsChart } from "@/components/admin/analytics-chart";

export const metadata = {
  title: "Admin Analytics & Overview | EduPulse",
  description: "Platform-wide analytics, enrollment momentum, and audit telemetry.",
};

export default async function AdminOverviewPage() {
  const metrics = await dataStore.getDashboardMetrics();
  const auditLogs = await dataStore.getAuditLogs();

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
            Platform Analytics
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Real-time PostgreSQL telemetry on enrollments, users, course publications, and completions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/courses/new">
            <Button variant="gradient" size="sm" className="rounded-xl">
              <PlusCircle className="mr-1.5 h-4 w-4" />
              Create Masterclass
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Registered Users</span>
            <Users className="h-4 w-4 text-brand-500" />
          </div>
          <p className="font-heading text-2xl font-bold text-foreground">
            {metrics.totalUsers}
          </p>
          <p className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
            {metrics.activeUsers} Active (Past 30 Days)
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Total Masterclasses</span>
            <BookOpen className="h-4 w-4 text-teal-500" />
          </div>
          <p className="font-heading text-2xl font-bold text-foreground">
            {metrics.totalCourses}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {metrics.publishedCourses} Published • {metrics.draftCourses} Drafts
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Enrollments</span>
            <GraduationCap className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="font-heading text-2xl font-bold text-foreground">
            {metrics.totalEnrollments}
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            Active course engagements
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Completion Rate</span>
            <TrendingUp className="h-4 w-4 text-amber-500" />
          </div>
          <p className="font-heading text-2xl font-bold text-foreground">
            {metrics.completionRate}%
          </p>
          <p className="text-[11px] text-muted-foreground">
            Completed curriculum ratio
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-heading text-lg font-bold text-foreground">
              Enrollment Momentum & Growth
            </h3>
            <p className="text-xs text-muted-foreground">
              Monthly student enrollments across all published masterclasses.
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            Past 6 Months
          </Badge>
        </div>

        <AnalyticsChart data={metrics.enrollmentTrends} />
      </div>

      {/* Two Column Section: Popular Courses & Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Courses */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="font-heading text-base font-bold text-foreground">
              Top Masterclasses
            </h3>
            <Link
              href="/admin/courses"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Manage all →
            </Link>
          </div>

          <div className="space-y-3">
            {metrics.popularCourses.map((c, idx) => (
              <div
                key={c.id}
                className="flex items-center justify-between rounded-xl bg-muted/30 p-3 text-xs"
              >
                <div className="space-y-0.5 truncate pr-4">
                  <p className="font-semibold text-foreground truncate">{c.title}</p>
                  <p className="text-muted-foreground text-[11px]">{c.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-foreground">{c.count}</span>
                  <span className="text-muted-foreground text-[10px] block">learners</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Audit Trail */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="font-heading text-base font-bold text-foreground">
              Security Audit Activity
            </h3>
            <Link
              href="/admin/audit-logs"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Full log →
            </Link>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 5).map((log) => {
              const formattedDate = new Date(log.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <div
                  key={log.id}
                  className="flex items-center justify-between rounded-xl bg-muted/30 p-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-mono font-bold text-brand-600 dark:text-brand-400 text-[11px]">
                      {log.action}
                    </span>
                    <p className="text-muted-foreground text-[11px]">
                      {log.entity_type}: {log.entity_id}
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{formattedDate}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
