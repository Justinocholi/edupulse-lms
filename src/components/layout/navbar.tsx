"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  GraduationCap,
  Shield,
  LayoutDashboard,
  LogOut,
  ChevronDown,
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
    { href: "/#home", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#academics", label: "Academics" },
    { href: "/#admissions", label: "Admissions" },
    { href: "/#management", label: "Management" },
    { href: "/#facilities", label: "Facilities" },
    { href: "/#bulletin", label: "Bulletin" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <>
      {/* 1. School Top Bar */}
      <div className="hidden lg:block bg-gradient-to-r from-[#001f3f] via-[#003366] to-[#001f3f] text-white text-[12px] font-semibold tracking-wide border-b border-[#66b2ff]/20">
        <div className="container mx-auto flex h-9 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <a
              href="tel:+2348031234567"
              className="flex items-center gap-2 hover:text-[#66b2ff] transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-[#66b2ff]" />
              <span>+234 803 123 4567</span>
            </a>
            <a
              href="mailto:info@teacherhomeschool.com"
              className="flex items-center gap-2 hover:text-[#66b2ff] transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-[#66b2ff]" />
              <span>info@teacherhomeschool.com</span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/90">
              <MapPin className="h-3.5 w-3.5 text-[#66b2ff]" />
              <span>Peace Community, Lokoja, Kogi State</span>
            </span>

            {/* External Staff Portal Link */}
            <a
              href="/admin"
              className="flex items-center gap-1 text-[#66b2ff] font-bold hover:text-white transition-colors"
              title="Teacher Home Staff & Administration Portal"
            >
              <Shield className="h-3.5 w-3.5" />
              <span>Staff Portal</span>
              <ExternalLink className="h-3 w-3 ml-0.5 opacity-80" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-[#003366]/10 bg-white/95 dark:bg-[#0a1320]/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          {/* Logo & Crest */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 rounded-xl bg-gradient-to-tr from-[#003366] to-[#004a99] p-1 shadow-md shadow-[#003366]/20 transition-transform group-hover:scale-105 flex items-center justify-center overflow-hidden border border-[#990033]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo.png"
                alt="Teacher Home Crest"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl md:text-2xl font-extrabold tracking-tight text-[#003366] dark:text-white leading-none">
                Teacher Home
              </span>
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-[#990033] dark:text-[#ff6685] mt-1">
                Secondary School
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    isActive
                      ? "text-[#003366] dark:text-white font-extrabold border-b-2 border-[#990033]"
                      : "text-slate-700 dark:text-slate-300 hover:text-[#003366] dark:hover:text-white hover:bg-[#e9f5ff] dark:hover:bg-slate-800/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons & Portal Links */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            {/* School Portal External Access Links */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-[#003366]/20 px-3.5 py-2 text-xs font-bold text-[#003366] dark:text-white hover:bg-[#e9f5ff] dark:hover:bg-slate-800 transition-colors shadow-sm"
              >
                Enroll Now
              </a>

              {/* Student Portal & Results Link */}
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#990033] to-[#7a0029] text-white px-4 py-2 text-xs font-bold shadow-md shadow-[#990033]/25 hover:opacity-95 hover:shadow-lg transition-all"
              >
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Student Portal</span>
                <ExternalLink className="h-3 w-3 ml-0.5 opacity-80" />
              </Link>
            </div>

            {/* Authenticated User Menu Dropdown */}
            {session?.user && (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 rounded-full p-1 transition hover:ring-2 hover:ring-[#003366]/30"
                  aria-label="User menu"
                >
                  <Avatar
                    src={session.user.avatar_url}
                    fallback={session.user.full_name}
                    size="sm"
                  />
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-xs font-semibold text-foreground leading-tight truncate max-w-[100px]">
                      {session.user.full_name}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">
                      {session.role}
                    </span>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-card p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="border-b border-border/60 px-3 py-2">
                      <p className="text-sm font-semibold text-foreground truncate">{session.user.full_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                      <div className="mt-2">
                        <Badge variant={session.role === "admin" ? "brand" : "secondary"}>
                          {session.role === "admin" ? "Staff / Administrator" : "Student"}
                        </Badge>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-accent"
                      >
                        <LayoutDashboard className="h-4 w-4 text-[#003366]" />
                        Student Dashboard
                      </Link>

                      {session.role === "admin" && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#003366] dark:text-[#66b2ff] font-medium hover:bg-[#e9f5ff] dark:hover:bg-slate-800"
                        >
                          <Shield className="h-4 w-4 text-[#990033]" />
                          Admin Console
                        </Link>
                      )}

                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        Settings
                      </Link>
                    </div>

                    <div className="border-t border-border/60 pt-1">
                      <Link
                        href="/logout"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign Out</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-[#003366]/20 bg-white dark:bg-slate-900 text-[#003366] dark:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-b border-[#003366]/10 bg-white dark:bg-[#0a1320] px-6 py-6 space-y-4 animate-in slide-in-from-top-4">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-[#e9f5ff] dark:hover:bg-slate-800 hover:text-[#003366]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-[#003366]/10 pt-4 flex flex-col gap-2.5">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#990033] to-[#7a0029] text-white py-2.5 text-xs font-bold shadow-md"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Student Portal (Check Results)</span>
                <ExternalLink className="h-3 w-3 opacity-80" />
              </Link>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#003366]/20 bg-[#003366] text-white py-2.5 text-xs font-bold"
              >
                <Shield className="h-4 w-4 text-[#66b2ff]" />
                <span>Staff Portal</span>
                <ExternalLink className="h-3 w-3 opacity-80" />
              </Link>

              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center rounded-xl border border-[#003366]/30 py-2.5 text-xs font-bold text-[#003366] dark:text-white hover:bg-[#e9f5ff]"
              >
                Apply for Admission
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
