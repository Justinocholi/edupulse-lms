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
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", label: "Analytics & Overview", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Course Management", icon: BookOpenCheck },
  { href: "/admin/courses/new", label: "Create New Course", icon: PlusCircle },
  { href: "/admin/users", label: "User Management", icon: Users },
  { href: "/admin/categories", label: "Category Taxonomy", icon: Tags },
  { href: "/admin/assessments", label: "Quiz Manager", icon: FileQuestion },
  { href: "/admin/certificates", label: "Certificates Registry", icon: Award },
  { href: "/admin/reviews", label: "Review Moderation", icon: MessageSquare },
  { href: "/admin/audit-logs", label: "Security Audit Logs", icon: ShieldAlert },
  { href: "/admin/settings", label: "Platform Settings", icon: Sliders },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 shrink-0 border-r border-border bg-card/60 p-4 md:min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Admin Console
            </h3>
            <span className="text-[10px] font-mono rounded bg-brand-500/10 px-1.5 py-0.5 text-brand-600 dark:text-brand-400">
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
                  className={cn(
                    "group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "bg-brand-600 text-white shadow-sm font-semibold"
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

        {/* Live Site Preview Quick Link */}
        <div className="border-t border-border pt-4 px-2 space-y-2">
          <Link
            href="/courses"
            target="_blank"
            className="flex items-center justify-between text-xs text-muted-foreground hover:text-foreground"
          >
            <span>Public Catalog</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center justify-between text-xs text-muted-foreground hover:text-foreground"
          >
            <span>Student Dashboard</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
