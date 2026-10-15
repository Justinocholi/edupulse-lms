import Link from "next/link";
import { Sparkles, Heart, ShieldCheck, Award, Globe, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/60 text-card-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 text-white shadow-md shadow-brand-500/20">
                <Sparkles className="h-5 w-5 fill-current" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                Edu<span className="text-teal-500">Pulse</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              EduPulse is the next-generation enterprise learning management ecosystem. Master software architecture, distributed systems, AI engineering, and cybersecurity from world-class industry authorities.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>SOC2 Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-brand-500" />
                <span>Verified Credentials</span>
              </div>
            </div>
          </div>

          {/* Catalog */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Explore Catalog</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/courses" className="hover:text-foreground transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-foreground transition-colors">
                  Course Categories
                </Link>
              </li>
              <li>
                <Link href="/courses?difficulty=beginner" className="hover:text-foreground transition-colors">
                  Beginner Friendly
                </Link>
              </li>
              <li>
                <Link href="/courses?difficulty=advanced" className="hover:text-foreground transition-colors">
                  Advanced Masterclasses
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="hover:text-foreground transition-colors">
                  Expert Instructors
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Hub */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Student Hub</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Learning Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/my-learning" className="hover:text-foreground transition-colors">
                  My Enrolled Courses
                </Link>
              </li>
              <li>
                <Link href="/dashboard/assessments" className="hover:text-foreground transition-colors">
                  Interactive Quizzes
                </Link>
              </li>
              <li>
                <Link href="/dashboard/certificates" className="hover:text-foreground transition-colors">
                  Digital Certificates
                </Link>
              </li>
              <li>
                <Link href="/certificates/EDU-NX89-44F2-88B1" className="hover:text-foreground transition-colors">
                  Verify a Certificate
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Company & Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About EduPulse
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact Support
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

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border/60 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} EduPulse Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="h-3 w-3 text-red-500 fill-current" /> Next.js 14 App Router & Supabase PostgreSQL
          </p>
        </div>
      </div>
    </footer>
  );
}
