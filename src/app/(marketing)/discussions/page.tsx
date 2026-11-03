import Link from "next/link";
import {
  MessageSquare,
  Search,
  PlusCircle,
  CheckCircle2,
  ThumbsUp,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { getCurrentSession } from "@/lib/auth/session";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DiscussionThreadList } from "./discussion-thread-list";

interface DiscussionsPageProps {
  searchParams: {
    category?: string;
    q?: string;
  };
}

export const metadata = {
  title: "Discussions & Q&A Forum | Teacher Home LMS",
  description:
    "Ask questions, exchange technical solutions, discuss assignments, and collaborate with classmates and instructors.",
};

export default async function DiscussionsPage({ searchParams }: DiscussionsPageProps) {
  const session = await getCurrentSession();
  const discussions = await dataStore.getDiscussions({
    category: searchParams.category,
    search: searchParams.q,
  });

  const categories = [
    { id: "all", label: "All Discussions" },
    { id: "Course Help", label: "Course & Lesson Help" },
    { id: "Academics & Announcements", label: "Academics & Exam Prep" },
    { id: "Technical Support", label: "Technical Support" },
  ];

  return (
    <div className="container py-10 px-4 md:px-6 space-y-8 max-w-6xl mx-auto">
      {/* 1. Header Banner */}
      <div className="rounded-3xl border border-[#003366]/20 bg-gradient-to-r from-[#001f3f] via-[#003366] to-[#001f3f] text-white p-8 md:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-[#66b2ff] border border-white/10">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Frappe LMS Standard Community Forum</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight">
              Academic &amp; Subject Discussions
            </h1>
            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              Have questions about lessons, coding assignments, or exam preparation? Engage directly with fellow students, teaching assistants, and lead instructors.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Discussions Interactive Client Component */}
      <DiscussionThreadList
        discussions={discussions}
        categories={categories}
        activeCategory={searchParams.category || "all"}
        searchQuery={searchParams.q || ""}
        currentUser={session.user}
      />
    </div>
  );
}
