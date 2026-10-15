import { MessageSquare, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Review Moderation | EduPulse Admin",
};

export default function AdminReviewsPage() {
  const sampleReviews = [
    {
      id: "rev-1",
      user: "Alex Rivera",
      course: "Enterprise Next.js 14 & Supabase Full-Stack Architecture",
      rating: 5,
      comment: "By far the most comprehensive, deeply architectural course on Next.js 14 App Router and Supabase RLS available anywhere.",
      date: "Feb 5, 2026",
    },
    {
      id: "rev-2",
      user: "Jordan Taylor",
      course: "Cloud-Native Kubernetes & Distributed Microservices",
      rating: 5,
      comment: "The Istio and Prometheus blueprints were immediately applicable to our team's multi-region Kubernetes clusters.",
      date: "Jan 28, 2026",
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
          Course Review Moderation
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Audit learner testimonials, ensure adherence to community guidelines, and moderate feedback.
        </p>
      </div>

      <div className="space-y-4">
        {sampleReviews.map((rev) => (
          <div
            key={rev.id}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-foreground">{rev.user}</span>
                <span className="text-xs text-muted-foreground ml-2">on {rev.course}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                <Star className="h-4 w-4 fill-current" />
                <span>{rev.rating}.0</span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-muted-foreground italic leading-relaxed">
              &ldquo;{rev.comment}&rdquo;
            </p>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/60 pt-3">
              <span>Submitted {rev.date}</span>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-destructive">
                <Trash2 className="mr-1 h-3 w-3" />
                Remove Review
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
