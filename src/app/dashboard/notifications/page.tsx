import Link from "next/link";
import { Bell, CheckCircle2, Award, BookOpen, AlertCircle } from "lucide-react";
import { requireAuth } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Notifications Hub | EduPulse",
  description: "Stay informed on course updates, assessment grades, and credentials.",
};

export default async function NotificationsPage() {
  const session = await requireAuth();
  const notifications = await dataStore.getUserNotifications(session.user!.id);

  const getIcon = (type: string) => {
    switch (type) {
      case "certificate":
        return <Award className="h-5 w-5 text-amber-500" />;
      case "enrollment":
        return <BookOpen className="h-5 w-5 text-teal-500" />;
      case "assessment":
        return <CheckCircle2 className="h-5 w-5 text-brand-500" />;
      default:
        return <Bell className="h-5 w-5 text-sky-500" />;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400">
          <Bell className="h-4 w-4" />
          <span>Activity Center</span>
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-foreground">
          Notifications
        </h1>
        <p className="text-sm text-muted-foreground">
          Real-time activity telemetry on enrollments, quiz evaluations, and certificate deliveries.
        </p>
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((n) => {
            const timeFormatted = new Date(n.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div
                key={n.id}
                className={`flex items-start gap-4 rounded-xl border p-4 transition-all ${
                  n.is_read
                    ? "border-border bg-card/60 text-muted-foreground"
                    : "border-brand-500/30 bg-brand-500/5 text-foreground shadow-sm"
                }`}
              >
                <div className="rounded-xl bg-background p-2 shadow-sm shrink-0 mt-0.5">
                  {getIcon(n.type)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-foreground">{n.title}</h4>
                    <span className="text-[11px] text-muted-foreground">{timeFormatted}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{n.message}</p>
                  {n.link && (
                    <div className="pt-1.5">
                      <Link
                        href={n.link}
                        className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                      >
                        View Details →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            No notifications yet.
          </div>
        )}
      </div>
    </div>
  );
}
