"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PlayCircle,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Download,
  HelpCircle,
  Menu,
  X,
  Lock,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Course, Module, Lesson, LessonProgress } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toggleLessonCompletionAction } from "@/app/learn/[courseSlug]/actions";
import { toast } from "sonner";

interface LessonPlayerProps {
  course: Course;
  modules: (Module & { lessons?: Lesson[] })[];
  initialLessonId?: string;
  userProgressList: LessonProgress[];
  isEnrolled: boolean;
  isAdmin: boolean;
}

export function LessonPlayer({
  course,
  modules,
  initialLessonId,
  userProgressList,
  isEnrolled,
  isAdmin,
}: LessonPlayerProps) {
  const router = useRouter();

  // Flatten all lessons in order
  const allLessons = React.useMemo(() => {
    return modules.flatMap((m) => m.lessons || []);
  }, [modules]);

  // Current active lesson
  const [activeLessonId, setActiveLessonId] = React.useState<string>(() => {
    if (initialLessonId && allLessons.some((l) => l.id === initialLessonId)) {
      return initialLessonId;
    }
    // Default to first incomplete lesson or first lesson
    const firstIncomplete = allLessons.find(
      (l) => !userProgressList.some((p) => p.lesson_id === l.id && p.is_completed)
    );
    return firstIncomplete?.id || allLessons[0]?.id || "";
  });

  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [progressState, setProgressState] = React.useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    userProgressList.forEach((p) => {
      map[p.lesson_id] = p.is_completed;
    });
    return map;
  });

  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const activeLessonIndex = allLessons.findIndex((l) => l.id === activeLessonId);
  const prevLesson = activeLessonIndex > 0 ? allLessons[activeLessonIndex - 1] : null;
  const nextLesson = activeLessonIndex < allLessons.length - 1 ? allLessons[activeLessonIndex + 1] : null;

  const isCurrentLessonCompleted = Boolean(activeLesson && progressState[activeLesson.id]);

  // Calculate course completion percentage
  const completedCount = Object.values(progressState).filter(Boolean).length;
  const progressPercentage = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;

  // Access check: unenrolled users can ONLY view is_preview lessons (or admins)
  const hasAccess = isEnrolled || isAdmin || activeLesson?.is_preview;

  const handleToggleComplete = async () => {
    if (!activeLesson) return;
    if (!isEnrolled && !isAdmin) {
      toast.error("Please enroll in this course to save lesson progress.");
      return;
    }

    const nextCompleted = !isCurrentLessonCompleted;
    // Optimistic UI update
    setProgressState((prev) => ({ ...prev, [activeLesson.id]: nextCompleted }));

    try {
      const res = await toggleLessonCompletionAction(activeLesson.id, course.id, nextCompleted);
      if (res.success) {
        if (nextCompleted) {
          toast.success("Lesson marked as complete!");
        }
      } else {
        // Rollback
        setProgressState((prev) => ({ ...prev, [activeLesson.id]: !nextCompleted }));
        toast.error(res.error || "Failed to update progress");
      }
    } catch {
      setProgressState((prev) => ({ ...prev, [activeLesson.id]: !nextCompleted }));
      toast.error("Failed to update progress");
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* LEFT CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Control Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-9 w-9 rounded-lg"
              aria-label="Toggle curriculum navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex flex-col">
              <Link href={`/courses/${course.slug}`} className="text-xs text-muted-foreground hover:underline truncate max-w-xs md:max-w-md">
                ← {course.title}
              </Link>
              <span className="text-sm font-bold text-foreground truncate max-w-xs md:max-w-md">
                {activeLesson?.title || "Course Player"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Progress indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <span>{progressPercentage}% Completed</span>
              <div className="w-24">
                <Progress value={progressPercentage} className="h-1.5" />
              </div>
            </div>

            {/* Mark complete button */}
            <Button
              variant={isCurrentLessonCompleted ? "outline" : "default"}
              size="sm"
              onClick={handleToggleComplete}
              className={`rounded-xl text-xs font-semibold ${
                isCurrentLessonCompleted
                  ? "border-emerald-500/50 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              <CheckCircle2 className="mr-1.5 h-4 w-4" />
              {isCurrentLessonCompleted ? "Completed" : "Mark as Complete"}
            </Button>
          </div>
        </div>

        {/* Lesson Body Content */}
        <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-8">
          {hasAccess ? (
            <>
              {/* VIDEO PLAYER SECTION */}
              {activeLesson?.content_type === "video" && (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-black shadow-xl">
                  {activeLesson.video_provider === "youtube" ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${activeLesson.video_id || "dQw4w9WgXcQ"}?autoplay=0&rel=0&modestbranding=1`}
                      title={activeLesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full border-0"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-white/70">
                      <div className="text-center space-y-2">
                        <PlayCircle className="mx-auto h-16 w-16 text-teal-400" />
                        <p className="text-sm">External media provider: {activeLesson.video_provider}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* QUIZ CALLOUT */}
              {activeLesson?.content_type === "quiz" && (
                <div className="rounded-2xl border border-brand-500/30 bg-brand-500/5 p-8 text-center space-y-4 shadow-sm">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-600 dark:text-brand-400">
                    <HelpCircle className="h-8 w-8" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    {activeLesson.title}
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Achieve the passing threshold to earn your verified credential and complete this masterclass.
                  </p>
                  <div className="pt-2">
                    <Link href={`/learn/${course.slug}/quiz/50000001-0000-0000-0000-000000000001`}>
                      <Button variant="gradient" size="lg" className="rounded-xl px-8">
                        Launch Interactive Assessment Exam →
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {/* LESSON NOTES & MARKDOWN CONTENT */}
              <div className="space-y-4">
                <div className="border-b border-border/80 pb-4">
                  <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
                    {activeLesson?.title}
                  </h1>
                </div>

                <div className="prose dark:prose-invert max-w-none text-foreground text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {activeLesson?.body_markdown}
                </div>
              </div>

              {/* DOWNLOADABLE LESSON RESOURCES */}
              {activeLesson?.resources && activeLesson.resources.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
                  <h3 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
                    <FileText className="h-5 w-5 text-teal-500" />
                    Downloadable Resources & Blueprints
                  </h3>
                  <div className="space-y-2">
                    {activeLesson.resources.map((res) => (
                      <div
                        key={res.id}
                        className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/40 p-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText className="h-4 w-4 text-brand-500" />
                          <span className="font-semibold text-foreground">{res.title}</span>
                          <span className="text-muted-foreground font-mono">
                            ({(res.file_size_bytes ? res.file_size_bytes / 1024 / 1024 : 1.5).toFixed(1)} MB)
                          </span>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs">
                          <Download className="mr-1.5 h-3.5 w-3.5" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PREVIOUS & NEXT LESSON NAVIGATION FOOTER */}
              <div className="flex items-center justify-between border-t border-border pt-6">
                {prevLesson ? (
                  <Button
                    variant="outline"
                    onClick={() => setActiveLessonId(prevLesson.id)}
                    className="rounded-xl text-xs"
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous: {prevLesson.title.slice(0, 24)}...
                  </Button>
                ) : (
                  <div />
                )}

                {nextLesson ? (
                  <Button
                    variant="gradient"
                    onClick={() => setActiveLessonId(nextLesson.id)}
                    className="rounded-xl text-xs"
                  >
                    Next: {nextLesson.title.slice(0, 24)}...
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Link href={`/learn/${course.slug}/quiz/50000001-0000-0000-0000-000000000001`}>
                    <Button variant="gradient" className="rounded-xl text-xs">
                      Take Final Exam →
                    </Button>
                  </Link>
                )}
              </div>
            </>
          ) : (
            /* ACCESS RESTRICTED CARD */
            <div className="rounded-3xl border border-border bg-card p-12 text-center max-w-lg mx-auto space-y-6 shadow-xl my-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
                <Lock className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Restricted Course Content
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You must be actively enrolled in <span className="font-semibold text-foreground">{course.title}</span> to stream this lesson and download project blueprints.
                </p>
              </div>

              <div className="pt-2">
                <Link href={`/courses/${course.slug}`}>
                  <Button variant="gradient" size="lg" className="w-full rounded-xl">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Enroll in Masterclass Now
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLLAPSIBLE CURRICULUM SIDEBAR */}
      {sidebarOpen && (
        <aside className="w-80 md:w-96 shrink-0 border-l border-border bg-card/60 flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-heading text-sm font-bold text-foreground">
              Course Curriculum
            </h3>
            <span className="text-xs text-muted-foreground font-mono">
              {completedCount}/{allLessons.length} Done
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-border/60">
            {modules.map((module, mIdx) => (
              <div key={module.id} className="p-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 py-1">
                  {module.title}
                </h4>

                <div className="mt-1 space-y-0.5">
                  {module.lessons?.map((lesson) => {
                    const isSelected = lesson.id === activeLessonId;
                    const isDone = Boolean(progressState[lesson.id]);
                    const canAccess = isEnrolled || isAdmin || lesson.is_preview;

                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => setActiveLessonId(lesson.id)}
                        className={`w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs transition ${
                          isSelected
                            ? "bg-brand-500/15 text-brand-600 dark:text-brand-300 font-semibold"
                            : "text-foreground hover:bg-accent/60"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {isDone ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          ) : canAccess ? (
                            <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                          ) : (
                            <Lock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </div>

                        {lesson.is_preview && (
                          <Badge variant="outline" className="text-[10px] text-teal-600 border-teal-500/30 shrink-0 ml-1">
                            Preview
                          </Badge>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
