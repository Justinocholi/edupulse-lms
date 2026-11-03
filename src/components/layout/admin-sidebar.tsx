"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpenCheck,
  PlusCircle,
  Users,
  Tags,
  FileQuestion,
  Award,
  MessageSquare,
  ShieldAlert,
  Sliders,
  ChevronRight,
  ExternalLink,
  LogOut,
  Shield,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", label: "Analytics & Overview", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Subject Management", icon: BookOpenCheck },
  { href: "/admin/batches", label: "Batches & Cohorts", icon: Video },
  { href: "/admin/courses/new", label: "Create New Subject", icon: PlusCircle },
  { href: "/admin/users", label: "Student & Staff Registry", icon: Users },
  { href: "/admin/categories", label: "Academic Categories", icon: Tags },
  { href: "/admin/assessments", label: "Examination Quizzes", icon: FileQuestion },
  { href: "/admin/certificates", label: "Certificates Registry", icon: Award },
  { href: "/admin/reviews", label: "Review Moderation", icon: MessageSquare },
  { href: "/admin/audit-logs", label: "Security & Audit Telemetry", icon: ShieldAlert },
  { href: "/admin/settings", label: "School Parameters", icon: Sliders },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 shrink-0 border-r border-border bg-card/60 p-4 md:min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#003366] dark:text-[#66b2ff]">
              Staff &amp; Admin Console
            </h3>
            <span className="text-[10px] font-mono rounded bg-[#003366]/10 px-1.5 py-0.5 text-[#003366] dark:text-[#66b2ff] font-bold">
              v1.0
            </span>
          </div>
          <nav className="space-y-1">
            {adminLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  className={cn(
                    "group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all",
                    isActive
                      ? "bg-[#003366] text-white shadow-sm font-bold"
                      : "text-muted-foreground hover:bg-[#e9f5ff] dark:hover:bg-slate-800 hover:text-[#003366] dark:hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="h-4 w-4 text-white/80" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Live Site Preview Quick Link */}
        <div className="border-t border-border pt-4 px-2 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between text-xs text-muted-foreground hover:text-foreground"
          >
            <span>School Home</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center justify-between text-xs text-muted-foreground hover:text-foreground"
          >
            <span>Student Dashboard</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <a
            href="https://school-website-one-umber.vercel.app/admin-login"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between text-xs text-muted-foreground hover:text-foreground"
          >
            <span>External Admin Gateway</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <div className="pt-2 border-t border-border/60">
            <Link
              href="/logout"
              className="flex items-center gap-2 text-xs text-destructive hover:bg-destructive/10 px-2 py-1.5 rounded-lg transition-colors font-medium"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
