"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ExternalLink,
  GraduationCap,
  Shield,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  BookOpen,
  Video,
  MessageSquare,
  Award,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AuthSession } from "@/lib/auth/session";

export function Navbar({ session }: { session: AuthSession }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);

  const navLinks = [
    { href: "/courses", label: "Courses", icon: BookOpen },
    { href: "/batches", label: "Batches & Live", icon: Video },
    { href: "/discussions", label: "Discussions", icon: MessageSquare },
    { href: "/certificates", label: "Certifications", icon: Award },
    { href: "/instructors", label: "Instructors", icon: Users },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-teal-400 text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg md:text-xl font-extrabold tracking-tight text-foreground leading-none">
              Edu<span className="text-brand-600 dark:text-brand-400">Pulse</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">
              LMS Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions & Auth */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {session?.user ? (
            /* Logged In User */
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="hidden sm:inline-flex">
                <Button variant="outline" size="sm" className="rounded-xl text-xs font-semibold">
                  <LayoutDashboard className="mr-1.5 h-3.5 w-3.5 text-brand-500" />
                  <span>My Learning</span>
                </Button>
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 rounded-full p-1 transition hover:ring-2 hover:ring-brand-500/30"
                  aria-label="User menu"
                >
                  <Avatar
                    src={session.user.avatar_url}
                    fallback={session.user.full_name}
                    size="sm"
                  />
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 rounded-2xl border border-border bg-card p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 z-50"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="border-b border-border/60 px-3 py-2.5">
                      <p className="text-sm font-bold text-foreground truncate">
                        {session.user.full_name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                      <div className="mt-2">
                        <Badge variant={session.role === "admin" ? "brand" : "secondary"}>
                          {session.role === "admin" ? "Platform Administrator" : "Student / Learner"}
                        </Badge>
                      </div>
                    </div>

                    <div className="py-1 text-xs">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-foreground hover:bg-accent font-medium"
                      >
                        <LayoutDashboard className="h-4 w-4 text-brand-500" />
                        <span>Student Dashboard</span>
                      </Link>

                      <Link
                        href="/batches"
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-foreground hover:bg-accent font-medium"
                      >
                        <Video className="h-4 w-4 text-[#990033]" />
                        <span>My Batches &amp; Live Classes</span>
                      </Link>

                      <Link
                        href="/dashboard/certificates"
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-foreground hover:bg-accent font-medium"
                      >
                        <Award className="h-4 w-4 text-amber-500" />
                        <span>Earned Certificates</span>
                      </Link>

                      {session.role === "admin" && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-brand-600 dark:text-brand-400 font-bold hover:bg-brand-500/10"
                        >
                          <Shield className="h-4 w-4" />
                          <span>Admin Console</span>
                        </Link>
                      )}

                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground font-medium"
                      >
                        <span>Account Settings</span>
                      </Link>
                    </div>

                    <div className="border-t border-border/60 pt-1">
                      <Link
                        href="/logout"
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign Out</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Unauthenticated Visitor */
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="rounded-xl text-xs font-semibold">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-card px-6 py-4 space-y-3 animate-in slide-in-from-top-4">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-xs font-bold text-foreground hover:bg-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-border/80 pt-3 flex flex-col gap-2">
            {session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-brand-600 text-white py-2 text-xs font-bold"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Student Dashboard</span>
                </Link>
                {session.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-border py-2 text-xs font-bold text-foreground"
                  >
                    <Shield className="h-4 w-4 text-brand-500" />
                    <span>Admin Console</span>
                  </Link>
                )}
                <Link
                  href="/logout"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-destructive/30 text-destructive py-2 text-xs font-bold"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-xl border border-border py-2 text-xs font-bold text-foreground"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-xl bg-brand-600 text-white py-2 text-xs font-bold"
                >
                  Create Free Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
