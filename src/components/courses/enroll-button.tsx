"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2, PlayCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { enrollInCourseAction } from "@/app/courses/[slug]/actions";

interface EnrollButtonProps {
  courseId: string;
  courseSlug: string;
  isEnrolled: boolean;
  isFree: boolean;
  price: number;
}

export function EnrollButton({
  courseId,
  courseSlug,
  isEnrolled,
  isFree,
  price,
}: EnrollButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  if (isEnrolled) {
    return (
      <Button
        variant="default"
        size="lg"
        onClick={() => router.push(`/learn/${courseSlug}`)}
        className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-lg shadow-emerald-600/20"
      >
        <PlayCircle className="mr-2 h-5 w-5" />
        Continue Course
      </Button>
    );
  }

  const handleEnroll = async () => {
    try {
      setLoading(true);
      const res = await enrollInCourseAction(courseId);
      if (res.success) {
        toast.success("Successfully enrolled in course!");
        router.push(`/learn/${courseSlug}`);
        router.refresh();
      } else {
        toast.error(res.error || "Enrollment failed. Please log in first.");
        if (res.error?.includes("log in")) {
          router.push(`/login?next=/courses/${courseSlug}`);
        }
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="gradient"
      size="lg"
      disabled={loading}
      onClick={handleEnroll}
      className="w-full rounded-xl font-semibold text-base shadow-xl shadow-brand-500/25"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Enrolling...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          {isFree ? "Enroll Now for Free" : `Enroll Now — $${price}`}
        </>
      )}
    </Button>
  );
}
