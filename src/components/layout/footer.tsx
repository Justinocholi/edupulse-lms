import Link from "next/link";
import { Sparkles, ShieldCheck, Award, BookOpen, Video, MessageSquare, Terminal, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/70 text-card-foreground">
      <div className="container mx-auto py-14 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-teal-400 text-white shadow-md shadow-brand-500/20">
                <Sparkles className="h-5 w-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-extrabold tracking-tight text-foreground leading-none">
                  Edu<span className="text-brand-600 dark:text-brand-400">Pulse</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">
                  LMS Platform
                </span>
              </div>
            </Link>

            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-sm">
              The modern, distraction-free learning management platform inspired by Frappe LMS. Structured masterclasses, live Zoom cohort batches, private study notes, server-graded assessments, and verifiable digital credentials.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Enterprise Verified</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Award className="h-4 w-4 text-amber-500" />
                <span>Tamper-Evident Credentials</span>
              </div>
            </div>
          </div>

          {/* Courses & Catalog */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Masterclasses</h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-medium">
              <li>
                <Link href="/courses" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-brand-500" />
                  <span>Browse All Courses</span>
                </Link>
              </li>
              <li>
                <Link href="/courses?difficulty=beginner" className="hover:text-foreground transition-colors">
                  Foundations &amp; Beginner
                </Link>
              </li>
              <li>
                <Link href="/courses?difficulty=advanced" className="hover:text-foreground transition-colors">
                  Advanced Architectures
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="hover:text-foreground transition-colors">
                  Lead Instructors
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  Course Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Batches & Discussions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Cohorts &amp; Q&amp;A</h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-medium">
              <li>
                <Link href="/batches" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                  <Video className="h-3.5 w-3.5 text-rose-500" />
                  <span>Live Cohort Batches</span>
                </Link>
              </li>
              <li>
                <Link href="/discussions" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5 text-teal-500" />
                  <span>Community Discussions</span>
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-amber-500" />
                  <span>Certificate Registry</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-foreground transition-colors">
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Company</h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-medium">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About EduPulse LMS
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Support &amp; Inquiries
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} EduPulse LMS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Built with <Heart className="h-3.5 w-3.5 text-rose-500 fill-current" /> Next.js 14 App Router, TypeScript &amp; Supabase
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
