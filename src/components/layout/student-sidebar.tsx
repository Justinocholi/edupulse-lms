"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Bookmark,
  Bell,
  Settings,
  FileQuestion,
  ChevronRight,
  LogOut,
  ExternalLink,
  Video,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const studentLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/my-learning", label: "Enrolled Courses", icon: BookOpen },
  { href: "/batches", label: "Batches & Live Classes", icon: Video },
  { href: "/discussions", label: "Discussions & Q&A", icon: MessageSquare },
  { href: "/dashboard/assessments", label: "Quizzes & Assessments", icon: FileQuestion },
  { href: "/dashboard/certificates", label: "Earned Certificates", icon: Award },
  { href: "/dashboard/bookmarks", label: "Saved Lessons", icon: Bookmark },
  { href: "/dashboard/notifications", label: "Announcements", icon: Bell },
  { href: "/dashboard/settings", label: "Account Profile", icon: Settings },
];

export function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 shrink-0 border-r border-border bg-card/50 p-4 md:min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Student Hub
            </h3>
            <span className="text-[10px] font-mono rounded bg-brand-500/10 px-1.5 py-0.5 text-brand-600 dark:text-brand-400 font-bold">
              Active
            </span>
          </div>

          <nav className="mt-2 space-y-1">
            {studentLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all",
                    isActive
                      ? "bg-brand-600 text-white shadow-sm font-bold"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
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

        {/* Quick Links */}
        <div className="border-t border-border pt-4 px-2 space-y-2">
          <Link
            href="/courses"
            className="flex items-center justify-between text-xs text-muted-foreground hover:text-foreground"
          >
            <span>Explore Courses</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/certificates"
            className="flex items-center justify-between text-xs text-muted-foreground hover:text-foreground"
          >
            <span>Certificate Registry</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <div className="pt-2 border-t border-border/60">
            <Link
              href="/logout"
              className="flex items-center gap-2 text-xs font-semibold text-destructive hover:underline"
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
