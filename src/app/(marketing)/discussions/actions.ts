"use server";

import { revalidatePath } from "next/cache";
import { getCurrentSession } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";

export async function createDiscussionAction(formData: FormData) {
  const session = await getCurrentSession();
  const userId = session.user?.id || "anonymous-guest";
  const userName = session.user?.full_name || "Community Member";
  const userRole = session.role || "student";
  const userAvatar = session.user?.avatar_url || undefined;

  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const category = (formData.get("category") as string) || "General Discussion";
  const courseId = (formData.get("courseId") as string) || null;

  if (!title || !content) {
    return { success: false, error: "Please enter both a title and details for your discussion." };
  }

  const thread = await dataStore.createDiscussion({
    title,
    content,
    category,
    courseId,
    userId,
    userName,
    userRole,
    userAvatar,
  });

  revalidatePath("/discussions");
  return { success: true, threadId: thread.id };
}

export async function addReplyAction(formData: FormData) {
  const session = await getCurrentSession();
  const userId = session.user?.id || "anonymous-guest";
  const userName = session.user?.full_name || "Community Member";
  const userRole = session.role || "student";
  const userAvatar = session.user?.avatar_url || undefined;

  const threadId = formData.get("threadId") as string;
  const content = (formData.get("content") as string)?.trim();
  const isAnswer = formData.get("isAnswer") === "true";

  if (!threadId || !content) {
    return { success: false, error: "Reply content cannot be empty." };
  }

  const reply = await dataStore.addDiscussionReply(threadId, {
    userId,
    userName,
    userAvatar,
    userRole,
    content,
    isAnswer,
  });

  if (!reply) {
    return { success: false, error: "Discussion thread not found." };
  }

  revalidatePath(`/discussions/${threadId}`);
  revalidatePath("/discussions");
  return { success: true };
}

export async function upvoteDiscussionAction(threadId: string) {
  const res = await dataStore.toggleDiscussionUpvote(threadId);
  revalidatePath(`/discussions/${threadId}`);
  revalidatePath("/discussions");
  return { success: true, upvotes: res.upvotes };
}
