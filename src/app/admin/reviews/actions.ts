"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";

export async function deleteReviewAction(reviewId: string) {
  const session = await requireAdmin();

  try {
    const success = await dataStore.deleteReview(reviewId);
    
    // Log audit trail
    await dataStore.createAuditLog({
      user_id: session.user!.id,
      action: "REVIEW_DELETED",
      entity_type: "review",
      entity_id: reviewId,
    });

    revalidatePath("/admin/reviews");
    revalidatePath("/courses");
    return { success };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to remove review" };
  }
}
