"use client";

import * as React from "react";
import { Star, Trash2, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteReviewAction } from "@/app/admin/reviews/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReviewCardProps {
  review: {
    id: string;
    rating: number;
    comment?: string | null;
    created_at: string;
    user?: {
      full_name?: string | null;
      email?: string | null;
      avatar_url?: string | null;
    };
    course?: {
      id?: string;
      title?: string;
      slug?: string;
    };
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete this review by ${review.user?.full_name || "Learner"}?`)) {
      return;
    }

    try {
      setIsDeleting(true);
      const res = await deleteReviewAction(review.id);
      if (res.success) {
        toast.success("Review removed successfully");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to remove review");
      }
    } catch {
      toast.error("Failed to remove review");
    } finally {
      setIsDeleting(false);
    }
  };

  const formattedDate = new Date(review.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3 transition-colors hover:border-border/80">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase overflow-hidden">
            {review.user?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={review.user.avatar_url} alt="" className="h-full w-full object-cover" />
            ) : (
              review.user?.full_name ? review.user.full_name[0] : <User className="h-4 w-4" />
            )}
          </div>
          <div>
            <div className="font-bold text-sm text-foreground">
              {review.user?.full_name || "Learner"}
            </div>
            {review.course && (
              <div className="text-xs text-muted-foreground">
                on <span className="font-medium text-foreground">{review.course.title}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span>{review.rating}.0</span>
        </div>
      </div>

      <p className="text-xs md:text-sm text-muted-foreground italic leading-relaxed pt-1">
        &ldquo;{review.comment || "No written feedback provided."}&rdquo;
      </p>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/60 pt-3">
        <span>Submitted {formattedDate}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
          className="h-7 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          {isDeleting ? (
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          ) : (
            <Trash2 className="mr-1 h-3 w-3" />
          )}
          Remove Review
        </Button>
      </div>
    </div>
  );
}
