import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  ThumbsUp,
  Clock,
  Sparkles,
  Send,
  Shield,
  User,
} from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { getCurrentSession } from "@/lib/auth/session";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { addReplyAction, upvoteDiscussionAction } from "../actions";
import { ThreadDetailClient } from "./thread-detail-client";

interface DiscussionDetailPageProps {
  params: {
    discussionId: string;
  };
}

export async function generateMetadata({ params }: DiscussionDetailPageProps) {
  const thread = await dataStore.getDiscussionById(params.discussionId);
  if (!thread) return { title: "Discussion Not Found" };
  return {
    title: `${thread.title} | EduPulse Discussions`,
    description: thread.content.slice(0, 160),
  };
}

export default async function DiscussionDetailPage({ params }: DiscussionDetailPageProps) {
  const session = await getCurrentSession();
  const thread = await dataStore.getDiscussionById(params.discussionId);

  if (!thread) {
    notFound();
  }

  return (
    <div className="container py-10 px-4 md:px-6 space-y-8 max-w-4xl mx-auto">
      {/* Top Breadcrumb */}
      <div>
        <Link
          href="/discussions"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Discussions</span>
        </Link>
      </div>

      <ThreadDetailClient
        thread={thread}
        sessionUser={session.user}
        userRole={session.role}
      />
    </div>
  );
}
