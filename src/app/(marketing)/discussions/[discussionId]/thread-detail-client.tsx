"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  CheckCircle2,
  ThumbsUp,
  Send,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { DiscussionThread } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { addReplyAction, upvoteDiscussionAction } from "../actions";
import { toast } from "sonner";

interface ThreadDetailClientProps {
  thread: DiscussionThread;
  sessionUser?: { id: string; full_name: string; email: string } | null;
  userRole?: string | null;
}

export function ThreadDetailClient({
  thread,
  sessionUser,
  userRole,
}: ThreadDetailClientProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const [replyText, setReplyText] = React.useState("");
  const [isAnswer, setIsAnswer] = React.useState(false);
  const [upvotes, setUpvotes] = React.useState(thread.upvotes);

  const canMarkAnswer = userRole === "admin" || userRole === "instructor" || sessionUser?.id === thread.user_id;

  const handleUpvote = async () => {
    try {
      setUpvotes((v) => v + 1);
      await upvoteDiscussionAction(thread.id);
      toast.success("Upvoted!");
    } catch {
      setUpvotes((v) => v - 1);
      toast.error("Failed to upvote");
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSubmitting(true);

    const formData = new FormData();
    formData.append("threadId", thread.id);
    formData.append("content", replyText.trim());
    formData.append("isAnswer", String(isAnswer));

    try {
      const res = await addReplyAction(formData);
      if (res.success) {
        toast.success("Reply submitted successfully!");
        setReplyText("");
        setIsAnswer(false);
        router.refresh();
      } else {
        toast.error(res.error || "Failed to post reply");
      }
    } catch {
      toast.error("Failed to submit reply");
    } finally {
      setSubmitting(false);
    }
  };

  const replies = thread.replies || [];
  const createdDate = new Date(thread.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* 1. Main Question Card */}
      <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                thread.user_avatar ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80"
              }
              alt={thread.user_name}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-[#003366]/20"
            />
            <div className="flex flex-col text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground text-sm">{thread.user_name}</span>
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
              </div>
              <span className="text-muted-foreground text-[11px]">{createdDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {thread.is_solved && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 text-xs font-bold border border-emerald-500/30">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Resolved</span>
              </span>
            )}
            {thread.category && (
              <Badge variant="secondary" className="text-xs font-semibold">
                {thread.category}
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="font-heading text-xl md:text-2xl font-extrabold text-foreground">
            {thread.title}
          </h1>
          <div className="prose dark:prose-invert max-w-none text-foreground text-sm md:text-base leading-relaxed whitespace-pre-line">
            {thread.content}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border/60 pt-4">
          <button
            onClick={handleUpvote}
            className="flex items-center gap-2 rounded-xl border border-border px-3.5 py-1.5 text-xs font-bold text-foreground hover:bg-accent transition"
          >
            <ThumbsUp className="h-4 w-4 text-[#003366] dark:text-[#66b2ff]" />
            <span>Helpful ({upvotes})</span>
          </button>

          <span className="text-xs text-muted-foreground">
            {replies.length} {replies.length === 1 ? "response" : "responses"}
          </span>
        </div>
      </div>

      {/* 2. Responses Section */}
      <div className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#003366] dark:text-[#66b2ff]" />
          <span>Discussion Responses ({replies.length})</span>
        </h2>

        {replies.length > 0 ? (
          <div className="space-y-4">
            {replies.map((reply) => {
              const replyDate = new Date(reply.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={reply.id}
                  className={`rounded-2xl border p-5 shadow-sm space-y-3 transition ${
                    reply.is_answer
                      ? "border-emerald-500/40 bg-emerald-500/5 ring-1 ring-emerald-500/20"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          reply.user_avatar ||
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                        }
                        alt={reply.user_name}
                        className="h-8 w-8 rounded-full object-cover ring-1 ring-border"
                      />
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-foreground">{reply.user_name}</span>
                        <Badge
                          variant={
                            reply.user_role === "instructor" || reply.user_role === "admin"
                              ? "brand"
                              : "outline"
                          }
                          className="text-[10px] uppercase font-mono px-1.5 py-0"
                        >
                          {reply.user_role || "Student"}
                        </Badge>
                        <span className="text-muted-foreground text-[11px]">• {replyDate}</span>
                      </div>
                    </div>

                    {reply.is_answer && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 text-white px-2.5 py-0.5 text-[10px] font-bold">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Accepted Solution</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs md:text-sm text-foreground leading-relaxed whitespace-pre-line">
                    {reply.content}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
            No responses posted yet. Be the first to reply to this discussion!
          </div>
        )}
      </div>

      {/* 3. Reply Submission Form */}
      <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-4">
        <h3 className="font-heading text-base font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#990033]" />
          <span>Post Your Response</span>
        </h3>

        <form onSubmit={handleReplySubmit} className="space-y-4">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            required
            rows={4}
            placeholder="Write your explanation or solution here..."
            className="w-full rounded-2xl border border-border bg-background p-4 text-xs md:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#003366]"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {canMarkAnswer && (
              <label className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isAnswer}
                  onChange={(e) => setIsAnswer(e.target.checked)}
                  className="rounded border-border text-[#003366] focus:ring-[#003366]"
                />
                <span>Mark as Accepted Answer / Official Solution</span>
              </label>
            )}

            <Button
              type="submit"
              disabled={submitting || !replyText.trim()}
              className="ml-auto rounded-xl bg-gradient-to-r from-[#990033] to-[#7a0029] text-white text-xs font-bold px-6 py-2 shadow-md"
            >
              <Send className="mr-1.5 h-3.5 w-3.5" />
              <span>{submitting ? "Posting..." : "Submit Response"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
