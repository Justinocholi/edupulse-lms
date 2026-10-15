import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Users,
  Star,
  Search,
  BookOpen,
  Code2,
  Cloud,
  Cpu,
  Layers,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/courses/course-card";
import { dataStore } from "@/lib/db/data-store";

export default async function HomePage() {
  const categories = await dataStore.getCategories();
  const featuredCourses = await dataStore.getCourses({ sort: "popular" });
  const recentCourses = await dataStore.getCourses({ sort: "newest" });

  const stats = [
    { label: "Active Engineers", value: "48,000+" },
    { label: "Masterclass Lessons", value: "1,250+" },
    { label: "Course Completion Rate", value: "94.2%" },
    { label: "Verified Certificates Issued", value: "16,400+" },
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

  const faqs = [
    {
      q: "How does EduPulse differ from Coursera or Udemy?",
      a: "EduPulse focuses purely on production-grade engineering, cloud architectures, and institutional curriculum. Rather than unvetted consumer submissions, each course is vetted and built with real codebases, Server Components, and interactive quizzes.",
    },
    {
      q: "Are certificates cryptographically verifiable?",
      a: "Yes. Every course certificate generates a unique tamper-proof identifier and public verification URL that can be validated by employers anywhere in the world.",
    },
    {
      q: "Can I take courses on mobile or tablet?",
      a: "Absolutely. EduPulse is completely responsive, featuring touch-friendly video streaming, lesson note downloads, and accessible dark mode.",
    },
    {
      q: "How do assessments and quizzes work?",
      a: "Assessments are evaluated securely on the server. Correct answer keys are never sent to the browser before submission. You receive instant itemized feedback and attempt tracking.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-b from-brand-950/[0.03] via-background to-background dark:from-brand-950/20">
        <div className="container relative z-10 mx-auto px-4 text-center">
          {/* Announcement pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-700 dark:text-teal-300 backdrop-blur-md mb-8">
            <Sparkles className="h-3.5 w-3.5 text-teal-500" />
            <span>EduPulse 2.0 is Live — High-Throughput Engineering Curriculum</span>
          </div>

          <h1 className="mx-auto max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl leading-[1.1]">
            Masterclass-Grade Education for Modern{" "}
            <span className="bg-gradient-to-r from-brand-600 via-teal-500 to-teal-400 bg-clip-text text-transparent">
              Engineers & Architects
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl leading-relaxed">
            Gain real mastery over Next.js 14, distributed Kubernetes microservices, production LLMs, and zero-trust cybersecurity through immersive interactive curriculums.
          </p>

          {/* Search bar & CTA buttons */}
          <div className="mx-auto mt-10 max-w-xl">
            <form action="/courses" method="GET" className="relative flex items-center shadow-lg rounded-2xl overflow-hidden border border-border bg-card">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                name="q"
                placeholder="Search masterclasses (e.g., Next.js, Kubernetes, AI, Security)..."
                className="h-14 w-full bg-transparent pl-12 pr-32 text-sm text-foreground focus:outline-none placeholder:text-muted-foreground"
              />
              <Button type="submit" variant="gradient" className="absolute right-2 h-10 rounded-xl px-5 text-xs font-semibold">
                Explore
              </Button>
            </form>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/courses">
              <Button variant="default" size="lg" className="rounded-xl px-7">
                Browse Full Catalog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="rounded-xl px-7">
                Go to Student Portal
              </Button>
            </Link>
          </div>

          {/* Platform Trust Highlights */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Real Server-Side Evaluation
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Award className="h-4 w-4 text-brand-500" /> Shareable Verified Credentials
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="h-4 w-4 text-teal-500" /> Zero-Trust PostgreSQL Security
            </span>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-border bg-card/50 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <p className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {s.value}
                </p>
                <p className="text-xs uppercase font-medium tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Specialized Tracks
              </span>
              <h2 className="mt-1 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Explore by Domain
              </h2>
            </div>
            <Link href="/categories" className="mt-4 md:mt-0 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
              View All Categories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                href={`/courses?category=${cat.id}`}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                    {cat.course_count || 1} courses
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1">
                <Flame className="h-4 w-4 text-amber-500" />
                Featured Masterclasses
              </div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Industry-Defining Curriculums
              </h2>
            </div>
            <Link href="/courses" className="mt-4 md:mt-0 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
              Browse All Courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING BENEFITS / PLATFORM FEATURES */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              The EduPulse Standard
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Engineered for Genuine Technical Competence
            </h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              We eliminated fragmented video libraries and superficial tutorials. EduPulse is structured around the exact workflows high-scale tech organizations demand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-border bg-card p-8 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                Structured Modular Curriculum
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Step-by-step sequential learning modules with interactive code examples, architecture blueprints, and downloadable technical assets.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                Server-Graded Assessments
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Quizzes evaluated on isolated server endpoints with strict answer concealment, passing thresholds, and detailed concept explanations.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                Publicly Verifiable Credentials
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Generate high-resolution printable certificates with unique verification codes accessible to hiring teams and colleagues worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STUDENT TESTIMONIALS */}
      <section className="py-20 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Student Success Stories
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trusted by Engineers at Top Tech Companies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm">
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{t.name}</h4>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Everything you need to know about the EduPulse platform.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold text-base text-foreground mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-6">
          <h2 className="font-heading text-3xl font-bold sm:text-5xl tracking-tight">
            Elevate Your Technical Career Today
          </h2>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            Join over 48,000 developers and architects building resilient cloud and full-stack software. Start learning with our free masterclasses now.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg" variant="default" className="rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold px-8">
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
