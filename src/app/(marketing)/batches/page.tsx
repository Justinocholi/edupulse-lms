import { Suspense } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  Video,
  Clock,
  ExternalLink,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { getCurrentSession } from "@/lib/auth/session";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BatchesPageProps {
  searchParams: {
    status?: string;
  };
}

export const metadata = {
  title: "Batches & Live Classes | Teacher Home LMS",
  description:
    "Join structured batches with scheduled live Zoom sessions, dedicated cohorts, instructor office hours, and peer discussion.",
};

export default async function BatchesPage({ searchParams }: BatchesPageProps) {
  const session = await getCurrentSession();
  const batches = await dataStore.getBatches({
    status: searchParams.status,
  });

  const activeStatus = searchParams.status || "all";

  return (
    <div className="container py-10 px-4 md:px-6 space-y-10 max-w-7xl mx-auto">
      {/* 1. Header Banner */}
      <div className="rounded-3xl border border-[#003366]/20 bg-gradient-to-br from-[#001f3f] via-[#003366] to-[#001f3f] text-white p-8 md:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[#66b2ff]/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md text-[#66b2ff] border border-white/10">
            <Video className="h-3.5 w-3.5" />
            <span>Interactive Cohorts &amp; Live Sessions</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Academic Batches &amp; Cohorts
          </h1>
          <p className="text-sm md:text-base text-white/80 leading-relaxed">
            Experience structured, calendar-based learning with your classmates. Each batch includes scheduled live Zoom/Meet lectures, instructor guidance, and interactive group discussions.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-white/90">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#66b2ff]" />
              Scheduled Timetables
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#66b2ff]" />
              Direct Live Zoom Access
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#66b2ff]" />
              Teacher Home Accreditation
            </span>
          </div>
        </div>
      </div>

      {/* 2. Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div className="flex items-center gap-2">
          {[
            { id: "all", label: "All Batches" },
            { id: "ongoing", label: "Ongoing Classes" },
            { id: "upcoming", label: "Upcoming Cohorts" },
          ].map((tab) => {
            const isActive = activeStatus === tab.id;
            return (
              <Link
                key={tab.id}
                href={tab.id === "all" ? "/batches" : `/batches?status=${tab.id}`}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#003366] text-white shadow-md shadow-[#003366]/20"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        <div className="text-xs text-muted-foreground font-medium">
          Showing <span className="font-bold text-foreground">{batches.length}</span> active cohorts
        </div>
      </div>

      {/* 3. Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((batch) => {
          const isOngoing = batch.status === "ongoing";
          const course = batch.course;
          const instructor = batch.instructor?.profile?.full_name || "Lead Teacher";
          const instructorAvatar =
            batch.instructor?.profile?.avatar_url ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";

          const startDateFormatted = new Date(batch.start_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          const endDateFormatted = new Date(batch.end_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          const seatPct = batch.max_seats
            ? Math.round((batch.enrolled_count / batch.max_seats) * 100)
            : 70;

          return (
            <div
              key={batch.id}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl hover:border-[#003366]/40 transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <Badge
                    variant={isOngoing ? "success" : "brand"}
                    className="capitalize text-[11px] font-bold"
                  >
                    {isOngoing ? "● Live / Ongoing" : "Upcoming Cohort"}
                  </Badge>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {startDateFormatted} – {endDateFormatted}
                  </span>
                </div>

                {/* Batch Title & Course Link */}
                <div className="space-y-1.5">
                  <Link href={`/batches/${batch.id}`}>
                    <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-[#003366] dark:group-hover:text-[#66b2ff] transition-colors line-clamp-1">
                      {batch.title}
                    </h3>
                  </Link>
                  {course && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 line-clamp-1">
                      <BookOpen className="h-3.5 w-3.5 text-[#003366] dark:text-[#66b2ff] shrink-0" />
                      <span>{course.title}</span>
                    </p>
                  )}
                </div>

                {/* Live Class Timetable Box */}
                <div className="rounded-xl border border-border/80 bg-muted/40 p-3 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-foreground">
                    <Clock className="h-3.5 w-3.5 text-[#990033]" />
                    <span>Live Class Timetable</span>
                  </div>
                  <p className="text-muted-foreground font-medium">
                    {batch.live_schedule_description || "Saturdays 10:00 AM WAT"}
                  </p>
                </div>

                {/* Instructor Row */}
                <div className="flex items-center gap-3 pt-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={instructorAvatar}
                    alt={instructor}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-[#003366]/20"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">{instructor}</span>
                    <span className="text-[11px] text-muted-foreground">Class Instructor</span>
                  </div>
                </div>

                {/* Enrollment Progress */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">Class Capacity</span>
                    <span className="font-semibold text-foreground">
                      {batch.enrolled_count} / {batch.max_seats || 40} Seats
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#003366] to-[#66b2ff] rounded-full"
                      style={{ width: `${seatPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-border/80 bg-muted/20 p-4 flex items-center gap-2">
                {batch.live_class_url && (
                  <a
                    href={batch.live_class_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#990033] to-[#7a0029] text-white px-3 py-2 text-xs font-bold shadow-sm hover:opacity-95 transition-opacity"
                  >
                    <Video className="h-3.5 w-3.5" />
                    <span>Join Live</span>
                  </a>
                )}
                <Link
                  href={`/batches/${batch.id}`}
                  className="flex-1 flex items-center justify-center gap-1 rounded-xl border border-[#003366]/30 bg-card px-3 py-2 text-xs font-bold text-[#003366] dark:text-white hover:bg-accent transition-colors"
                >
                  <span>Batch Hub</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
