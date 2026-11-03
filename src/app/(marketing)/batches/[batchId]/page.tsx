import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Video,
  Users,
  BookOpen,
  Bell,
  MessageSquare,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { getCurrentSession } from "@/lib/auth/session";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BatchDetailPageProps {
  params: {
    batchId: string;
  };
}

export async function generateMetadata({ params }: BatchDetailPageProps) {
  const batch = await dataStore.getBatchById(params.batchId);
  if (!batch) return { title: "Batch Not Found" };
  return {
    title: `${batch.title} | EduPulse LMS`,
    description: `Engineering batch and live classes for ${batch.title}.`,
  };
}

export default async function BatchDetailPage({ params }: BatchDetailPageProps) {
  const session = await getCurrentSession();
  const batch = await dataStore.getBatchById(params.batchId);

  if (!batch) {
    notFound();
  }

  const course = batch.course;
  const instructor = batch.instructor?.profile?.full_name || "Lead Instructor";
  const instructorAvatar =
    batch.instructor?.profile?.avatar_url ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";

  const startDateFormatted = new Date(batch.start_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const endDateFormatted = new Date(batch.end_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="container py-10 px-4 md:px-6 space-y-8 max-w-6xl mx-auto">
      {/* Top Breadcrumb */}
      <div>
        <Link
          href="/batches"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Batches</span>
        </Link>
      </div>

      {/* Hero Header Card */}
      <div className="rounded-3xl border border-brand-500/20 bg-gradient-to-r from-brand-950 via-slate-900 to-brand-950 text-white p-8 md:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={batch.status === "ongoing" ? "success" : "brand"}
                className="capitalize text-xs font-bold"
              >
                {batch.status === "ongoing" ? "● Live / Ongoing" : "Upcoming Cohort"}
              </Badge>
              <span className="text-xs text-white/80 font-mono">
                {startDateFormatted} – {endDateFormatted}
              </span>
            </div>

            <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
              {batch.title}
            </h1>

            {course && (
              <p className="text-sm text-white/90 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-brand-400" />
                <span>Curriculum: <strong className="text-white">{course.title}</strong></span>
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={instructorAvatar}
                alt={instructor}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white/30"
              />
              <div className="flex flex-col text-xs">
                <span className="font-bold text-white">{instructor}</span>
                <span className="text-white/70">Cohort Lead &amp; Mentor</span>
              </div>
            </div>
          </div>

          {/* Action Callout */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md space-y-4 shrink-0 md:w-72">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-300">
                Live Class Schedule
              </span>
              <p className="text-sm font-semibold text-white">
                {batch.live_schedule_description || "Saturdays 10:00 AM UTC"}
              </p>
            </div>

            {batch.live_class_url ? (
              <a
                href={batch.live_class_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white py-3 text-xs font-bold shadow-lg transition-all"
              >
                <Video className="h-4 w-4" />
                <span>Join Zoom Live Session</span>
                <ExternalLink className="h-3.5 w-3.5 ml-1 opacity-80" />
              </a>
            ) : (
              <Button disabled variant="secondary" className="w-full text-xs">
                Live Link Scheduled Soon
              </Button>
            )}

            {course && (
              <Link href={`/learn/${course.slug}`}>
                <Button variant="outline" className="w-full text-xs font-bold border-white/30 text-white hover:bg-white/10">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Access Course Player
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Announcements, Timetable & Class Discussions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Announcements & Curriculum Jump */}
        <div className="lg:col-span-2 space-y-8">
          {/* Announcements Noticeboard */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#990033]" />
                <span>Instructor Announcements</span>
              </h2>
              <span className="text-xs text-muted-foreground font-mono">
                {batch.announcements?.length || 0} notices
              </span>
            </div>

            {batch.announcements && batch.announcements.length > 0 ? (
              <div className="space-y-4">
                {batch.announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="rounded-xl border border-border/80 bg-muted/40 p-4 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-foreground">{ann.title}</span>
                      <span className="text-[11px] text-muted-foreground">
                        {new Date(ann.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-xs md:text-sm">
                      {ann.content}
                    </p>
                    <div className="pt-1 text-[11px] font-semibold text-[#003366] dark:text-[#66b2ff]">
                      Posted by {ann.author_name}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic py-4">
                No formal announcements posted for this batch yet. All upcoming notifications will appear here.
              </p>
            )}
          </div>

          {/* Curriculum Quick Jump */}
          {course && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-border/80 pb-3">
                <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#003366] dark:text-[#66b2ff]" />
                  <span>Syllabus &amp; Learning Modules</span>
                </h2>
                <Link
                  href={`/learn/${course.slug}`}
                  className="text-xs font-bold text-[#003366] dark:text-[#66b2ff] hover:underline"
                >
                  Open in Player →
                </Link>
              </div>

              <div className="space-y-3">
                {course.modules && course.modules.length > 0 ? (
                  course.modules.map((mod, idx) => (
                    <div
                      key={mod.id}
                      className="rounded-xl border border-border/80 bg-muted/30 p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-foreground">
                        <span>Module {idx + 1}: {mod.title}</span>
                        <span className="text-muted-foreground font-mono">
                          {mod.lessons?.length || 0} Lessons
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{mod.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground italic py-2">
                    Lessons and exercises are linked to this batch.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Class Roster & Batch Info */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              <span>Cohort Roster &amp; Capacity</span>
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Seats Filled</span>
                <span className="font-bold text-foreground">
                  {batch.enrolled_count} / {batch.max_seats || 40}
                </span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-600 to-teal-400 rounded-full"
                  style={{
                    width: `${Math.round(
                      (batch.enrolled_count / (batch.max_seats || 40)) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="rounded-xl bg-brand-500/10 p-3 space-y-1 text-xs">
              <span className="font-bold text-brand-600 dark:text-brand-400">
                Need Batch Assistance?
              </span>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Contact EduPulse cohort operations at cohorts@edupulse.io for timetable adjustments or team group enrolments.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-teal-500" />
              <span>Cohort Discussions</span>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Have questions about this batch&apos;s assignments or live classes? Join the community discussion.
            </p>
            <Link href="/discussions">
              <Button variant="outline" className="w-full text-xs font-bold">
                View Discussions Forum →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
