"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Shield,
  Sparkles,
  User,
  X,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { logoutAction } from "@/lib/auth/actions";
import { AuthSession } from "@/lib/auth/session";

export function Navbar({ session }: { session: AuthSession }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);

  const navLinks = [
    { href: "/courses", label: "Explore Courses", icon: Compass },
    { href: "/categories", label: "Categories", icon: BookOpen },
    { href: "/instructors", label: "Instructors", icon: GraduationCap },
    { href: "/about", label: "About", icon: null },
    { href: "/contact", label: "Contact", icon: null },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 transition-transform hover:scale-[1.02]">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-teal-400 text-white shadow-md shadow-brand-500/20">
              <Sparkles className="h-5 w-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                Edu<span className="text-teal-500">Pulse</span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground -mt-1">
                LMS Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* User state */}
          {session.user ? (
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
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-semibold text-foreground leading-tight truncate max-w-[120px]">
                    {session.user.full_name}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">
                    {session.role}
                  </span>
                </div>
              </button>

              {/* Dropdown Menu */}
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
                        {session.role === "admin" ? "Administrator" : "Student"}
                      </Badge>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-accent"
                    >
                      <LayoutDashboard className="h-4 w-4 text-brand-500" />
                      Student Dashboard
                    </Link>

                    {session.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-brand-600 dark:text-brand-400 font-medium hover:bg-brand-50 dark:hover:bg-brand-950/50"
                      >
                        <Shield className="h-4 w-4 text-brand-500" />
                        Admin Dashboard
                      </Link>
                    )}

                    <Link
                      href="/dashboard/my-learning"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-accent"
                    >
                      <GraduationCap className="h-4 w-4 text-teal-500" />
                      My Learning
                    </Link>

                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-accent"
                    >
                      <User className="h-4 w-4 text-muted-foreground" />
                      Profile Settings
                    </Link>
                  </div>


                  <div className="border-t border-border/60 pt-1">
                    <Link
                      href="/logout"
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 font-medium"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="gradient" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-card p-4 space-y-3 animate-in slide-in-from-top-4">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
              >
                {link.icon && <link.icon className="h-4 w-4 text-brand-500" />}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
