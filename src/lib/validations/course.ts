import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(120),
  subtitle: z.string().max(200).optional().nullable(),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category_id: z.string().uuid("Please select a valid category"),
  difficulty: z.enum(["beginner", "intermediate", "advanced", "all_levels"]),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  thumbnail_url: z.string().url("Must be a valid image URL").optional().nullable(),
  trailer_video_url: z.string().url("Must be a valid video URL").optional().nullable(),
  price: z.coerce.number().min(0, "Price cannot be negative"),
  is_free: z.boolean().default(true),
  estimated_duration_minutes: z.coerce.number().min(0).default(0),
  learning_outcomes: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  target_audience: z.array(z.string()).default([]),
  passing_grade_percentage: z.coerce.number().min(50).max(100).default(75),
  certificate_enabled: z.boolean().default(true),
});

export type CourseFormData = z.infer<typeof courseSchema>;

export const moduleSchema = z.object({
  title: z.string().min(3, "Module title must be at least 3 characters").max(100),
  description: z.string().max(300).optional().nullable(),
  sort_order: z.number().int().min(0).default(0),
});

export type ModuleFormData = z.infer<typeof moduleSchema>;

export const lessonSchema = z.object({
  title: z.string().min(3, "Lesson title must be at least 3 characters").max(120),
  content_type: z.enum(["video", "text", "quiz", "resource"]),
  body_markdown: z.string().optional().nullable(),
  video_provider: z.enum(["mux", "youtube", "vimeo", "custom", "none"]).default("youtube"),
  video_id: z.string().optional().nullable(),
  video_duration_seconds: z.coerce.number().min(0).default(0),
  is_preview: z.boolean().default(false),
  sort_order: z.number().int().min(0).default(0),
});

export type LessonFormData = z.infer<typeof lessonSchema>;

export const quizSubmissionSchema = z.object({
  quiz_id: z.string().uuid(),
  answers: z.record(z.string().uuid(), z.string().uuid()), // question_id -> selected_option_id
});

export type QuizSubmissionData = z.infer<typeof quizSubmissionSchema>;
