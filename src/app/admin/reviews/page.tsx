import { MessageSquare, Star, ShieldCheck } from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { requireAdmin } from "@/lib/auth/session";
import { ReviewCard } from "@/components/admin/review-card";

export const metadata = {
  title: "Review Moderation | EduPulse Admin",
};

export default async function AdminReviewsPage() {
  await requireAdmin();
  const reviews = await dataStore.getAllReviews();

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / totalReviews).toFixed(1)
    : "0.0";

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
            Course Review Moderation
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Audit learner feedback, ensure community guidelines compliance, and moderate ratings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-card border border-border px-3.5 py-2 rounded-xl text-xs font-medium shadow-sm">
            <span className="text-muted-foreground">Total Reviews:</span>
            <span className="font-bold text-foreground">{totalReviews}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>Avg {avgRating}</span>
          </div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center space-y-3">
          <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <MessageSquare className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-base text-foreground">No course reviews submitted yet</h3>
          <p className="text-xs md:text-sm text-muted-foreground max-w-sm mx-auto">
            When enrolled learners complete courses and leave feedback, their ratings and reviews will appear here for audit and moderation.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      )}
    </div>
  );
}
