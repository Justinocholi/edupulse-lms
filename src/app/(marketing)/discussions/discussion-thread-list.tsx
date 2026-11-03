"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  Search,
  PlusCircle,
  CheckCircle2,
  ThumbsUp,
  Clock,
  Sparkles,
  ArrowRight,
  Send,
  X,
} from "lucide-react";
import { DiscussionThread } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createDiscussionAction, upvoteDiscussionAction } from "./actions";
import { toast } from "sonner";

interface DiscussionThreadListProps {
  discussions: DiscussionThread[];
  categories: { id: string; label: string }[];
  activeCategory: string;
  searchQuery: string;
  currentUser?: { id: string; full_name: string; email: string } | null;
}

export function DiscussionThreadList({
  discussions,
  categories,
  activeCategory,
  searchQuery,
  currentUser,
}: DiscussionThreadListProps) {
  const router = useRouter();
  const [showCreateForm, setShowCreateForm] = React.useState(false);
  const [search, setSearch] = React.useState(searchQuery);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeCategory && activeCategory !== "all") params.set("category", activeCategory);
    if (search.trim()) params.set("q", search.trim());
    router.push(`/discussions?${params.toString()}`);
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await createDiscussionAction(formData);
      if (res.success) {
        toast.success("Discussion started successfully!");
        setShowCreateForm(false);
        if (res.threadId) {
          router.push(`/discussions/${res.threadId}`);
        } else {
          router.refresh();
        }
      } else {
        toast.error(res.error || "Failed to start discussion");
      }
    } catch {
      toast.error("Failed to post discussion");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpvote = async (threadId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await upvoteDiscussionAction(threadId);
      toast.success("Upvoted!");
      router.refresh();
    } catch {
      toast.error("Failed to upvote");
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search discussions or keywords..."
            className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#003366]"
          />
        </form>

        {/* Start Discussion Button */}
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="w-full sm:w-auto rounded-xl bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold shadow-md shadow-[#003366]/20"
        >
          <PlusCircle className="mr-1.5 h-4 w-4" />
          <span>{showCreateForm ? "Close Form" : "Start New Discussion"}</span>
        </Button>
      </div>

      {/* Expandable Discussion Creation Card */}
      {showCreateForm && (
        <div className="rounded-2xl border-2 border-[#003366]/30 bg-card p-6 shadow-xl animate-in slide-in-from-top-4 space-y-4">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <h3 className="font-heading text-base font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#990033]" />
              <span>Ask a Question or Share a Solution</span>
            </h3>
            <button
              onClick={() => setShowCreateForm(false)}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Discussion Title</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. How to structure continuous assessment in Term 1?"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#003366]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Category</label>
              <select
                name="category"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#003366]"
              >
                <option value="Course Help">Course &amp; Lesson Help</option>
                <option value="Academics & Announcements">Academics &amp; Exam Prep</option>
                <option value="Technical Support">Technical Support</option>
                <option value="General Discussion">General Discussion</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Discussion Content</label>
              <textarea
                name="content"
                required
                rows={4}
                placeholder="Describe your question or discussion point in detail..."
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-[#003366]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowCreateForm(false)}
                className="rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={submitting}
                className="rounded-xl bg-gradient-to-r from-[#990033] to-[#7a0029] text-white text-xs font-bold shadow-md"
              >
                <Send className="mr-1.5 h-3.5 w-3.5" />
                <span>{submitting ? "Posting..." : "Post Discussion"}</span>
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-3">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <Link
              key={cat.id}
              href={cat.id === "all" ? "/discussions" : `/discussions?category=${cat.id}`}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                isActive
                  ? "bg-[#003366] text-white shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      {/* Discussion Threads List */}
      <div className="space-y-4">
        {discussions.length > 0 ? (
          discussions.map((thread) => {
            const repliesCount = thread.replies?.length || 0;
            const createdDate = new Date(thread.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

            return (
              <div
                key={thread.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-[#003366]/30 transition-all duration-200 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        thread.user_avatar ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80"
                      }
                      alt={thread.user_name}
                      className="h-8 w-8 rounded-full object-cover ring-1 ring-border"
                    />
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-foreground">{thread.user_name}</span>
                      <Badge
                        variant={
                          thread.user_role === "instructor" || thread.user_role === "admin"
                            ? "brand"
                            : "outline"
                        }
                        className="text-[10px] uppercase font-mono px-1.5 py-0"
                      >
                        {thread.user_role || "Student"}
                      </Badge>
                      <span className="text-muted-foreground text-[11px]">• {createdDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {thread.is_solved && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 text-[10px] font-bold border border-emerald-500/30">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Solved</span>
                      </span>
                    )}
                    {thread.category && (
                      <Badge variant="secondary" className="text-[10px] font-semibold">
                        {thread.category}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <Link href={`/discussions/${thread.id}`}>
                    <h3 className="font-heading text-base font-bold text-foreground hover:text-[#003366] dark:hover:text-[#66b2ff] transition-colors">
                      {thread.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {thread.content}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => handleUpvote(thread.id, e)}
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-[#003366] font-semibold transition-colors"
                      title="Upvote discussion"
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>{thread.upvotes}</span>
                    </button>

                    <Link
                      href={`/discussions/${thread.id}`}
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground font-semibold"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>{repliesCount} {repliesCount === 1 ? "reply" : "replies"}</span>
                    </Link>
                  </div>

                  <Link
                    href={`/discussions/${thread.id}`}
                    className="flex items-center gap-1 font-bold text-[#003366] dark:text-[#66b2ff] hover:underline"
                  >
                    <span>View Thread</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-3">
            <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground/60" />
            <h4 className="font-bold text-sm text-foreground">No discussions found</h4>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Be the first to ask a question or initiate an academic discussion in this category.
            </p>
            <Button
              onClick={() => setShowCreateForm(true)}
              size="sm"
              className="rounded-xl text-xs bg-[#003366] text-white"
            >
              Start First Discussion
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
