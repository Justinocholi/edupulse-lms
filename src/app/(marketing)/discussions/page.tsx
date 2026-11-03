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
  title: "Discussions & Q&A Forum | EduPulse LMS",
  description:
    "Ask questions, exchange technical solutions, discuss assignments, and collaborate with peers and instructors.",
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
      <div className="rounded-3xl border border-teal-500/20 bg-gradient-to-r from-brand-950 via-slate-900 to-teal-950 text-white p-8 md:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-teal-300 border border-white/10">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Frappe LMS Standard Community Forum</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight">
              Community Discussions &amp; Q&amp;A
            </h1>
            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              Have questions about lessons, system architectures, or assignment challenges? Engage directly with fellow engineers, mentors, and lead instructors.
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
