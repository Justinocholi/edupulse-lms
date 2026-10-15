import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  Star,
  Users,
  BookOpen,
  Award,
  CheckCircle,
  FileText,
  Video,
  PlayCircle,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { getCurrentSession } from "@/lib/auth/session";
import { Badge } from "@/components/ui/badge";
import { EnrollButton } from "@/components/courses/enroll-button";
import { formatDuration, formatCurrency } from "@/lib/utils";

interface CourseDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CourseDetailPageProps) {
  const course = await dataStore.getCourseBySlug(params.slug, { includeDrafts: true });
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} | EduPulse`,
    description: course.subtitle || course.description,
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const session = await getCurrentSession();
  const isAdmin = session.role === "admin";

  const course = await dataStore.getCourseBySlug(params.slug, { includeDrafts: isAdmin });
  if (!course) {
    notFound();
  }

  const userEnrollment = session.user
    ? await dataStore.getUserEnrollment(session.user.id, course.id)
    : null;
  const isEnrolled = Boolean(userEnrollment);

  const totalLessons =
    course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;

  const primaryInstructor = course.instructors?.[0] || {
    profile: {
      full_name: "EduPulse Faculty Lead",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      headline: "Senior Engineering Authority",
      bio: "Industry veteran with deep expertise in production architectures and scalable system design.",
    },
    title: "Senior Staff Instructor",
    rating: 4.95,
    total_students: 35000,
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-gradient-to-b from-brand-950/20 via-background to-background border-b border-border py-12 md:py-16">
        <div className="container px-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/courses" className="hover:text-foreground">
              Courses
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            {course.category && (
              <>
                <Link href={`/courses?category=${course.category.id}`} className="hover:text-foreground">
                  {course.category.name}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
              </>
            )}
            <span className="text-foreground font-medium truncate max-w-xs">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="brand" className="capitalize text-xs font-semibold">
                  {course.difficulty.replace("_", " ")}
                </Badge>
                {course.status === "draft" && (
                  <Badge variant="warning" className="text-xs font-semibold">
                    Draft Preview (Admin Only)
                  </Badge>
                )}
                {course.category && (
                  <Badge variant="outline" className="text-xs">
                    {course.category.name}
                  </Badge>
                )}
              </div>

              <h1 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                {course.title}
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {course.subtitle || course.description}
              </p>

              {/* Meta stats */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground pt-2">
                <div className="flex items-center gap-1.5 text-amber-500 font-semibold">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{course.rating ? course.rating.toFixed(1) : "5.0"}</span>
                  <span className="text-muted-foreground font-normal">
                    ({course.reviews_count || 120} ratings)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>{course.enrollment_count || 450} students enrolled</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{formatDuration(course.estimated_duration_minutes)} on-demand</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  <span>{totalLessons} lessons across {course.modules?.length || 0} modules</span>
                </div>
              </div>
            </div>

            {/* Desktop Quick Card */}
            <div className="hidden lg:block rounded-2xl border border-border bg-card p-6 shadow-xl space-y-6">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                {course.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={course.thumbnail_url} alt={course.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <BookOpen className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold text-foreground">
                    {course.is_free ? "Free" : formatCurrency(course.price)}
                  </span>
                  <Badge variant="success">Instant Lifetime Access</Badge>
                </div>
              </div>

              <EnrollButton
                courseId={course.id}
                courseSlug={course.slug}
                isEnrolled={isEnrolled}
                isFree={course.is_free}
                price={course.price}
              />

              <div className="space-y-3 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">This masterclass includes:</p>
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-brand-500" />
                  <span>{formatDuration(course.estimated_duration_minutes)} HD video streaming</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-teal-500" />
                  <span>Downloadable code resources & blueprints</span>
                </div>
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-amber-500" />
                  <span>Server-evaluated knowledge assessments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-emerald-500" />
                  <span>Official cryptographically verifiable certificate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Course Content Tabs / Breakdown */}
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* What you'll learn */}
            {course.learning_outcomes && course.learning_outcomes.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4">
                <h3 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-teal-500" />
                  What You Will Learn
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                  {course.learning_outcomes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Description */}
            <div className="space-y-4">
              <h3 className="font-heading text-2xl font-bold text-foreground">
                Course Description
              </h3>
              <div className="prose dark:prose-invert max-w-none text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                {course.description}
              </div>
            </div>

            {/* Course Syllabus / Curriculum */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Course Curriculum
                </h3>
                <span className="text-xs text-muted-foreground">
                  {course.modules?.length || 0} modules • {totalLessons} lessons
                </span>
              </div>

              <div className="space-y-4">
                {course.modules && course.modules.length > 0 ? (
                  course.modules.map((module, mIdx) => (
                    <div key={module.id} className="rounded-xl border border-border bg-card overflow-hidden">
                      <div className="bg-muted/40 p-4 border-b border-border/60">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm md:text-base text-foreground">
                            {module.title}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {module.lessons?.length || 0} lessons
                          </span>
                        </div>
                        {module.description && (
                          <p className="mt-1 text-xs text-muted-foreground">{module.description}</p>
                        )}
                      </div>

                      <div className="divide-y divide-border/60">
                        {module.lessons?.map((lesson, lIdx) => (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between p-3.5 text-xs md:text-sm hover:bg-muted/20 transition"
                          >
                            <div className="flex items-center gap-3">
                              {lesson.content_type === "video" ? (
                                <PlayCircle className="h-4 w-4 text-brand-500" />
                              ) : lesson.content_type === "quiz" ? (
                                <HelpCircle className="h-4 w-4 text-amber-500" />
                              ) : (
                                <FileText className="h-4 w-4 text-teal-500" />
                              )}
                              <span className="font-medium text-foreground">{lesson.title}</span>
                            </div>

                            <div className="flex items-center gap-3">
                              {lesson.is_preview && (
                                <Badge variant="outline" className="text-[10px] text-teal-600 border-teal-500/30">
                                  Free Preview
                                </Badge>
                              )}
                              {lesson.video_duration_seconds > 0 && (
                                <span className="text-muted-foreground font-mono">
                                  {Math.round(lesson.video_duration_seconds / 60)}m
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Curriculum is being finalized.</p>
                )}
              </div>
            </div>

            {/* Prerequisites & Audience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.prerequisites && course.prerequisites.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-6 space-y-3">
                  <h4 className="font-semibold text-base text-foreground">Prerequisites</h4>
                  <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                    {course.prerequisites.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {course.target_audience && course.target_audience.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-6 space-y-3">
                  <h4 className="font-semibold text-base text-foreground">Target Audience</h4>
                  <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                    {course.target_audience.map((a, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Instructor Bio */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4">
              <h3 className="font-heading text-xl font-bold text-foreground">
                Your Instructor
              </h3>
              <div className="flex items-start gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={primaryInstructor.profile?.avatar_url || ""}
                  alt={primaryInstructor.profile?.full_name || ""}
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-brand-500/20"
                />
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-foreground">
                    {primaryInstructor.profile?.full_name}
                  </h4>
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                    {primaryInstructor.profile?.headline}
                  </p>
                  <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {primaryInstructor.profile?.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Bottom / Sidebar card */}
          <div className="lg:hidden rounded-2xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-foreground">
                {course.is_free ? "Free" : formatCurrency(course.price)}
              </span>
              <Badge variant="success">Instant Access</Badge>
            </div>
            <EnrollButton
              courseId={course.id}
              courseSlug={course.slug}
              isEnrolled={isEnrolled}
              isFree={course.is_free}
              price={course.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
