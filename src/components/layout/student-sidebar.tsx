"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Award,
  Bookmark,
  Bell,
  Settings,
  HelpCircle,
  FileQuestion,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const studentLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/my-learning", label: "My Learning", icon: GraduationCap },
  { href: "/dashboard/assessments", label: "Assessments", icon: FileQuestion },
  { href: "/dashboard/certificates", label: "Certificates", icon: Award },
  { href: "/dashboard/bookmarks", label: "Bookmarks", icon: Bookmark },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/settings", label: "Account Settings", icon: Settings },
];

export function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 shrink-0 border-r border-border bg-card/40 p-4 md:min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Student Portal
          </h3>
          <nav className="mt-2 space-y-1">
            {studentLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? "text-brand-600 dark:text-brand-400" : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="h-4 w-4 text-brand-500" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Quick helper card */}
        <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 p-4 text-xs">
          <p className="font-semibold text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
            <HelpCircle className="h-3.5 w-3.5" />
            Need assistance?
          </p>
          <p className="mt-1 text-muted-foreground leading-relaxed">
            Have questions about course access or certificate verification?
          </p>
          <Link
            href="/contact"
            className="mt-2.5 inline-block font-semibold text-teal-600 dark:text-teal-400 hover:underline"
          >
            Contact Advisor →
          </Link>
        </div>

        {/* Sign Out Link */}
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
    </aside>
  );
}
