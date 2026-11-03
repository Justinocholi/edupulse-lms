"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Search,
  BookOpen,
  Video,
  MessageSquare,
  Award,
  ShieldCheck,
  CheckCircle2,
  Users,
  Code2,
  Layers,
  FileText,
  Clock,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Calendar,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/courses/course-card";
import { Course, Batch, DiscussionThread, Category } from "@/types";

interface LMSLandingProps {
  courses: Course[];
  batches: Batch[];
  discussions: DiscussionThread[];
  categories: Category[];
}

export function LMSLanding({
  courses,
  batches,
  discussions,
  categories,
}: LMSLandingProps) {
  const router = useRouter();
  const [certCodeInput, setCertCodeInput] = React.useState("");
  const [previewTab, setPreviewTab] = React.useState<"reading" | "discussions" | "notes" | "blueprints">("reading");

  const handleCertLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certCodeInput.trim()) return;
    router.push(`/certificates/${encodeURIComponent(certCodeInput.trim())}`);
  };

  const stats = [
    { label: "Active Engineers", value: "48,000+" },
    { label: "Masterclass Lessons", value: "1,250+" },
    { label: "Course Completion Rate", value: "94.2%" },
    { label: "Verified Credentials", value: "16,400+" },
  ];

  const pillars = [
    {
      icon: BookOpen,
      title: "Structured Curriculum",
      description:
        "Deep technical courses structured into sequential chapters and focused lessons, eliminating tutorial bloat.",
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      icon: Video,
      title: "Live Cohorts & Batches",
      description:
        "Scheduled live classes over Zoom / Google Meet with real-time Q&A, batch announcements, and peer study groups.",
      color: "text-rose-500 bg-rose-500/10",
    },
    {
      icon: FileText,
      title: "Distraction-Free Player",
      description:
        "Clean markdown reader, auto-saved personal study notes, downloadable blueprints, and chapter bookmarks.",
      color: "text-teal-500 bg-teal-500/10",
    },
    {
      icon: ShieldCheck,
      title: "Server-Evaluated Quizzes",
      description:
        "Strict answer concealment, passing percentage thresholds, and immediate concept remediation on submission.",
      color: "text-indigo-500 bg-indigo-500/10",
    },
    {
      icon: Award,
      title: "Verifiable Certificates",
      description:
        "Cryptographically indexed certificate codes with public verification URLs for hiring teams and LinkedIn.",
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      icon: MessageSquare,
      title: "Community Discussions",
      description:
        "Contextual lesson discussions and global forum topics with peer upvoting and marked accepted solutions.",
      color: "text-emerald-500 bg-emerald-500/10",
    },
  ];

  const testimonials = [
    {
      name: "David O'Connor",
      role: "Staff Infrastructure Engineer at Vercel",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      content:
        "EduPulse is unmatched in its technical depth. The Next.js 14 & Supabase Architecture course directly helped our team refactor our core streaming pipelines with zero downtime.",
    },
    {
      name: "Elena Rostova",
      role: "Lead Machine Learning Specialist",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
      content:
        "Most online courses teach toy scripts. EduPulse dives straight into production RAG systems, PostgreSQL vector indexing, and real security policies.",
    },
    {
      name: "Tariq Mansoor",
      role: "Cybersecurity Analyst",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      content:
        "The automated quizzes and instant verified digital certificates made this the most rewarding certification I've completed this year.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 bg-gradient-to-b from-brand-500/[0.04] via-background to-background">
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          {/* Announcement pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-700 dark:text-brand-300 backdrop-blur-md mb-8">
            <Sparkles className="h-3.5 w-3.5 text-brand-500" />
            <span>EduPulse 2.0 • Distraction-Free Frappe LMS Architecture</span>
          </div>

          <h1 className="mx-auto max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl leading-[1.1]">
            Master Production Software &amp;{" "}
            <span className="bg-gradient-to-r from-brand-600 via-teal-500 to-teal-400 bg-clip-text text-transparent">
              Cloud Architectures
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl leading-relaxed">
            A high-performance learning management system built for serious engineers. Structured curriculums, live Zoom cohorts, distraction-free reading, and publicly verifiable certificates.
          </p>

          {/* Course Search Bar */}
          <div className="mx-auto mt-10 max-w-xl">
            <form action="/courses" method="GET" className="relative flex items-center shadow-lg rounded-2xl overflow-hidden border border-border bg-card">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                name="search"
                placeholder="Search masterclasses (e.g., Next.js 14, Kubernetes, LLMs)..."
                className="w-full bg-transparent py-4 pl-12 pr-28 text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button type="submit" size="sm" className="absolute right-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold">
                Explore
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Popular Topics:</span>
              <Link href="/courses?category=Full-Stack+Development" className="rounded-lg bg-muted px-2.5 py-1 hover:text-foreground transition-colors">
                Next.js 14
              </Link>
              <Link href="/courses?category=Cloud+%26+DevOps" className="rounded-lg bg-muted px-2.5 py-1 hover:text-foreground transition-colors">
                Kubernetes
              </Link>
              <Link href="/courses?category=Artificial+Intelligence" className="rounded-lg bg-muted px-2.5 py-1 hover:text-foreground transition-colors">
                Generative AI
              </Link>
              <Link href="/batches" className="rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold px-2.5 py-1 hover:bg-rose-500/20 transition-colors">
                Live Cohorts
              </Link>
            </div>
          </div>

          {/* Quick Action CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/courses">
              <Button size="lg" className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold px-7 shadow-lg shadow-brand-600/25">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse All Masterclasses
              </Button>
            </Link>
            <Link href="/batches">
              <Button size="lg" variant="outline" className="rounded-xl border-border bg-card font-bold px-7 hover:bg-accent">
                <Video className="mr-2 h-4 w-4 text-rose-500" />
                Join a Live Batch
              </Button>
            </Link>
            <Link href="/certificates">
              <Button size="lg" variant="ghost" className="rounded-xl font-bold px-5 text-muted-foreground hover:text-foreground">
                <Award className="mr-2 h-4 w-4 text-amber-500" />
                Verify Certificate
              </Button>
            </Link>
          </div>
        </div>

        {/* Platform Metrics Bar */}
        <div className="container mx-auto px-4 mt-16 md:mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-3xl border border-border bg-card/80 p-8 shadow-sm backdrop-blur-md">
            {stats.map((s, idx) => (
              <div key={idx} className="text-center space-y-1">
                <p className="font-heading text-2xl md:text-4xl font-extrabold text-brand-600 dark:text-brand-400">
                  {s.value}
                </p>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. FRAPPE LMS CORE ARCHITECTURAL PILLARS */}
      <section className="py-20 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              The Frappe LMS Architecture
            </span>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Engineered for Deep Learning, Not Distraction
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Traditional online platforms overwhelm learners with ads, superficial slides, and fragmented videos. EduPulse delivers a focused, structured environment built around genuine mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="rounded-2xl border border-border bg-card p-7 space-y-4 hover:border-brand-500/50 transition-all hover:shadow-md">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${p.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {p.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. LIVE COHORTS & BATCHES SPOTLIGHT */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                <Video className="h-3.5 w-3.5" />
                <span>Synchronous Live Classes</span>
              </div>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Upcoming Live Cohorts &amp; Batches
              </h2>
              <p className="text-sm text-muted-foreground">
                Join live instructor-led cohorts with real-time Zoom classes, scheduled office hours, and peer discussion accountability.
              </p>
            </div>
            <Link href="/batches">
              <Button variant="outline" className="rounded-xl border-border font-bold text-xs gap-1.5">
                <span>View All Cohorts</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {batches.slice(0, 2).map((batch) => (
              <div
                key={batch.id}
                className="group relative rounded-3xl border border-border bg-card p-6 md:p-8 space-y-6 shadow-sm hover:border-rose-500/40 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        {batch.status === "ongoing" ? "Active Cohort" : "Enrolling Now"}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                      {batch.title}
                    </h3>
                  </div>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {batch.enrolled_count}/{batch.max_seats || 40} Enrolled
                  </Badge>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {batch.course?.description || batch.title}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-muted/40 rounded-2xl p-4 border border-border/60">
                  <div className="flex items-center gap-2 text-foreground font-medium sm:col-span-2">
                    <Clock className="h-4 w-4 text-brand-500 shrink-0" />
                    <span>{batch.live_schedule_description || "Tuesdays & Thursdays, 7:00 PM UTC"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground font-medium sm:col-span-2">
                    <Video className="h-4 w-4 text-rose-500 shrink-0" />
                    <span>Live Zoom Classroom with Interactive Q&amp;A</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-muted-foreground">
                    Instructor: <span className="font-bold text-foreground">{batch.instructor?.profile?.full_name || "Lead Instructor"}</span>
                  </div>
                  <Link href={`/batches/${batch.id}`}>
                    <Button size="sm" className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs">
                      Join Cohort Hub
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED MASTERCLASSES GRID */}
      <section className="py-20 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Curriculum Catalog
              </span>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Featured Engineering Masterclasses
              </h2>
              <p className="text-sm text-muted-foreground">
                In-depth, self-paced technical courses created by experienced software architects.
              </p>
            </div>
            <Link href="/courses">
              <Button variant="outline" className="rounded-xl border-border font-bold text-xs gap-1.5">
                <span>Explore All Courses</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 6).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. DISTRACTION-FREE COURSE PLAYER INTERACTIVE PREVIEW */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Immersive Learning Experience
            </span>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              The Distraction-Free Lesson Player
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Everything you need in one unified, focused workstation: lesson readings, community Q&amp;A discussions, personal study notes, and downloadable code blueprints.
            </p>
          </div>

          {/* Interactive Player Simulation Frame */}
          <div className="rounded-3xl border border-border bg-card shadow-2xl overflow-hidden max-w-5xl mx-auto">
            {/* Player Topbar */}
            <div className="border-b border-border bg-muted/40 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-xs font-mono font-semibold text-muted-foreground">
                  lesson-player.tsx — Chapter 2: Server Actions &amp; Row-Level Security
                </span>
              </div>
              <Badge variant="outline" className="text-xs font-medium">
                Lesson 4 of 12 • 45m
              </Badge>
            </div>

            {/* Interactive Tabs */}
            <div className="border-b border-border bg-card px-6 flex gap-2 overflow-x-auto">
              <button
                onClick={() => setPreviewTab("reading")}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                  previewTab === "reading"
                    ? "border-brand-600 text-brand-600 dark:text-brand-400"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Lesson Reading</span>
              </button>

              <button
                onClick={() => setPreviewTab("discussions")}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                  previewTab === "discussions"
                    ? "border-teal-500 text-teal-600 dark:text-teal-400"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Lesson Q&amp;A Discussion (3)</span>
              </button>

              <button
                onClick={() => setPreviewTab("notes")}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                  previewTab === "notes"
                    ? "border-amber-500 text-amber-600 dark:text-amber-400"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Personal Study Notes</span>
              </button>

              <button
                onClick={() => setPreviewTab("blueprints")}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
                  previewTab === "blueprints"
                    ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Download Blueprints</span>
              </button>
            </div>

            {/* Tab Preview Content */}
            <div className="p-8 md:p-10 min-h-[320px] bg-background/50">
              {previewTab === "reading" && (
                <div className="space-y-4 max-w-2xl animate-in fade-in">
                  <h3 className="font-heading text-2xl font-bold text-foreground">
                    Implementing Cryptographic Row-Level Security Policies in Supabase
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    PostgreSQL Row-Level Security (RLS) ensures that even if application server code has a flaw, database queries cannot return unauthorized records. In this lesson, we dissect multi-tenant isolation...
                  </p>
                  <div className="rounded-xl border border-border bg-card p-4 font-mono text-xs text-muted-foreground space-y-1">
                    <p className="text-emerald-500 font-semibold">-- Postgres RLS Policy Example</p>
                    <p>CREATE POLICY &quot;Tenant isolation policy&quot; ON tenant_data</p>
                    <p>&nbsp;&nbsp;FOR ALL USING (auth.uid() = user_id);</p>
                  </div>
                </div>
              )}

              {previewTab === "discussions" && (
                <div className="space-y-4 max-w-2xl animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      Lesson Discussions &amp; Peer Q&amp;A
                    </h3>
                    <Badge variant="outline" className="text-xs">3 active questions</Badge>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-foreground">How does Next.js server caching interact with RLS headers?</span>
                      <span className="text-emerald-600 font-bold">✓ Solved</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      &ldquo;When using cookies() in Next.js Server Components, routes become dynamically rendered, avoiding stale cross-tenant cache leaks.&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {previewTab === "notes" && (
                <div className="space-y-4 max-w-2xl animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      Private Study Notes
                    </h3>
                    <span className="text-xs text-emerald-600 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Auto-saved to browser
                    </span>
                  </div>
                  <textarea
                    readOnly
                    rows={4}
                    value="• Remember to verify Supabase service_role key is NEVER exposed on client!&#10;• PostgreSQL session cookies expire after 7 days by default.&#10;• Always test RLS policies using unprivileged role queries."
                    className="w-full rounded-xl border border-border bg-card p-4 text-xs font-mono text-foreground leading-relaxed outline-none"
                  />
                </div>
              )}

              {previewTab === "blueprints" && (
                <div className="space-y-4 max-w-2xl animate-in fade-in">
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    Lesson Blueprints &amp; Architecture Diagrams
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-border bg-card p-4 space-y-2">
                      <p className="text-xs font-bold text-foreground">Next.js 14 RLS Architecture.pdf</p>
                      <p className="text-[11px] text-muted-foreground">High-resolution schematic (2.4 MB)</p>
                      <Button size="sm" variant="outline" className="text-xs w-full">Download PDF</Button>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4 space-y-2">
                      <p className="text-xs font-bold text-foreground">production-migration.sql</p>
                      <p className="text-[11px] text-muted-foreground">Tested migration scripts (42 KB)</p>
                      <Button size="sm" variant="outline" className="text-xs w-full">Download SQL</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. INSTANT CERTIFICATE VERIFICATION REGISTRY */}
      <section className="py-20 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.05] via-card to-card p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                  <Award className="h-3.5 w-3.5" />
                  <span>Public Credential Registry</span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
                  Cryptographically Verifiable Credentials
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Every certificate issued by EduPulse is permanently recorded with a unique tamper-evident verification code. Employers, recruiters, and colleagues can validate credentials instantly.
                </p>
                <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Try lookup code: <code className="bg-muted px-2 py-0.5 rounded font-mono">EDU-NX89-44F2-88B1</code></span>
                </div>
              </div>

              {/* Direct Verification Lookup Form */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-foreground">Lookup Credential by Code</h3>
                <form onSubmit={handleCertLookup} className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. EDU-NX89-44F2-88B1"
                      value={certCodeInput}
                      onChange={(e) => setCertCodeInput(e.target.value)}
                      className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-xs font-mono outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
                  >
                    <Award className="mr-2 h-4 w-4" />
                    Verify Authenticity
                  </Button>
                </form>
                <p className="text-[11px] text-muted-foreground text-center">
                  Or browse the public <Link href="/certificates" className="font-semibold text-amber-600 dark:text-amber-400 hover:underline">Certificates Directory</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. COMMUNITY DISCUSSIONS SPOTLIGHT */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Community Driven Knowledge
              </span>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Active Discussions &amp; Peer Q&amp;A
              </h2>
              <p className="text-sm text-muted-foreground">
                Ask questions, share code solutions, and learn alongside thousands of engineers around the world.
              </p>
            </div>
            <Link href="/discussions">
              <Button variant="outline" className="rounded-xl border-border font-bold text-xs gap-1.5">
                <span>Open Forum Hub</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discussions.slice(0, 3).map((d) => (
              <Link
                key={d.id}
                href={`/discussions/${d.id}`}
                className="group rounded-2xl border border-border bg-card p-6 space-y-4 hover:border-teal-500/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[11px]">
                      {d.category}
                    </Badge>
                    {d.is_solved && (
                      <Badge variant="success" className="text-[10px] font-bold">
                        ✓ Solved
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-heading text-base font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {d.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {d.content}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/60 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{d.user_name}</span>
                  <div className="flex items-center gap-3">
                    <span>▲ {d.upvotes}</span>
                    <span>💬 {d.replies?.length || 0}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-20 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Peer Endorsements
            </span>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Trusted by Engineers at Top Tech Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm">
                <p className="text-xs md:text-sm text-muted-foreground italic leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{t.name}</h4>
                    <p className="text-[11px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. INSTRUCTOR RECRUITMENT CALL */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Share Your Expertise
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
                Teach on EduPulse LMS
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Are you a staff engineer or systems architect? Author modular courses, host live Zoom cohort batches, and mentor ambitious developers across the globe.
              </p>
            </div>
            <Link href="/contact">
              <Button size="lg" className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shrink-0 px-6">
                Apply as Instructor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FINAL CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-tr from-brand-950 via-slate-900 to-brand-900 text-white border-t border-brand-900">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-6">
          <h2 className="font-heading text-3xl font-extrabold sm:text-5xl tracking-tight">
            Elevate Your Technical Career Today
          </h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            Join over 48,000 developers and architects building resilient software systems. Start learning with our free masterclasses or join a live cohort now.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg" className="rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 shadow-lg">
                Create Free Account
              </Button>
            </Link>
            <Link href="/courses">
              <Button size="lg" variant="outline" className="rounded-xl border-white/20 text-white hover:bg-white/10 px-8">
                Explore All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
