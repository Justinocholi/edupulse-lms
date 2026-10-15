import Link from "next/link";
import { Clock, Star, Users, BookOpen, CheckCircle2 } from "lucide-react";
import { Course } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatDuration, formatCurrency } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
  progressPercentage?: number;
  isEnrolled?: boolean;
}

export function CourseCard({ course, progressPercentage, isEnrolled }: CourseCardProps) {
  const difficultyColor = {
    beginner: "success",
    intermediate: "brand",
    advanced: "destructive",
    all_levels: "secondary",
  }[course.difficulty] as "success" | "brand" | "destructive" | "secondary";

  const totalLessons =
    course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 12;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-500/30">
      {/* Thumbnail */}
      <Link href={isEnrolled ? `/learn/${course.slug}` : `/courses/${course.slug}`} className="relative aspect-video w-full overflow-hidden bg-muted">
        {course.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-900/10 text-brand-600">
            <BookOpen className="h-12 w-12" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge variant={difficultyColor} className="capitalize text-[11px] font-semibold backdrop-blur-md">
            {course.difficulty.replace("_", " ")}
          </Badge>
          {course.category?.name && (
            <Badge variant="outline" className="bg-background/80 backdrop-blur-md text-[11px]">
              {course.category.name}
            </Badge>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="rounded-lg bg-background/90 px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur-md">
            {course.is_free ? "Free" : formatCurrency(course.price)}
          </span>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <Link href={isEnrolled ? `/learn/${course.slug}` : `/courses/${course.slug}`}>
          <h3 className="line-clamp-2 font-heading text-lg font-bold tracking-tight text-foreground group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {course.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
          {course.subtitle || course.description}
        </p>

        {/* Course Meta Info */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-3">
          <div className="flex items-center gap-1 text-amber-500 font-semibold">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>{course.rating ? course.rating.toFixed(1) : "5.0"}</span>
            <span className="text-[11px] text-muted-foreground font-normal">
              ({course.reviews_count || 120})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatDuration(course.estimated_duration_minutes)}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{totalLessons} lessons</span>
            </div>
          </div>
        </div>

        {/* Enrolled Progress Bar */}
        {isEnrolled && typeof progressPercentage === "number" && (
          <div className="mt-4 border-t border-border/60 pt-3 space-y-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-foreground">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}

        {/* Action Button */}
        <div className="mt-4 pt-2">
          <Link
            href={isEnrolled ? `/learn/${course.slug}` : `/courses/${course.slug}`}
            className="flex w-full items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground transition hover:bg-brand-600 hover:text-white"
          >
            {isEnrolled ? (
              progressPercentage === 100 ? (
                <>
                  <CheckCircle2 className="mr-1.5 h-4 w-4 text-emerald-500" />
                  Completed — Review Lessons
                </>
              ) : (
                "Continue Learning →"
              )
            ) : (
              "View Course Details →"
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
