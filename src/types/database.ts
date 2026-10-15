export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'student' | 'admin' | 'instructor';
export type CourseDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'all_levels';
export type CourseStatus = 'draft' | 'published' | 'archived';
export type LessonContentType = 'video' | 'text' | 'quiz' | 'resource';
export type VideoProvider = 'mux' | 'youtube' | 'vimeo' | 'custom' | 'none';
export type EnrollmentStatus = 'active' | 'completed' | 'dropped';
export type NotificationType = 'info' | 'success' | 'warning' | 'enrollment' | 'certificate' | 'assessment';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string | null;
  headline?: string | null;
  bio?: string | null;
  website?: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRoleRecord {
  id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
}

export interface InstructorProfile {
  id: string;
  user_id: string;
  title: string;
  bio: string;
  expertise: string[];
  total_students: number;
  total_courses: number;
  rating: number;
  verified: boolean;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  sort_order: number;
  created_at: string;
  course_count?: number;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  description: string;
  category_id?: string | null;
  difficulty: CourseDifficulty;
  status: CourseStatus;
  thumbnail_url?: string | null;
  trailer_video_url?: string | null;
  price: number;
  is_free: boolean;
  estimated_duration_minutes: number;
  learning_outcomes: string[];
  prerequisites: string[];
  target_audience: string[];
  passing_grade_percentage: number;
  certificate_enabled: boolean;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
  // joined relations
  category?: Category | null;
  modules?: Module[];
  instructors?: InstructorProfile[];
  enrollment_count?: number;
  rating?: number;
  reviews_count?: number;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description?: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  slug: string;
  content_type: LessonContentType;
  body_markdown?: string | null;
  video_provider?: VideoProvider | null;
  video_id?: string | null;
  video_duration_seconds: number;
  is_preview: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  resources?: LessonResource[];
  quiz?: Quiz | null;
  progress?: LessonProgress | null;
}

export interface LessonResource {
  id: string;
  lesson_id: string;
  title: string;
  file_url: string;
  file_type: string;
  file_size_bytes?: number | null;
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: EnrollmentStatus;
  enrolled_at: string;
  completed_at?: string | null;
  last_accessed_lesson_id?: string | null;
  last_accessed_at: string;
  progress_percentage: number;
  course?: Course;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  is_completed: boolean;
  completed_at?: string | null;
  time_spent_seconds: number;
  last_playback_position_seconds: number;
  updated_at: string;
}

export interface Quiz {
  id: string;
  course_id: string;
  lesson_id?: string | null;
  title: string;
  description?: string | null;
  passing_score: number;
  time_limit_minutes?: number | null;
  max_attempts: number;
  is_randomized: boolean;
  created_at: string;
  updated_at: string;
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  explanation?: string | null;
  points: number;
  sort_order: number;
  created_at: string;
  options?: QuizOption[];
}

export interface QuizOption {
  id: string;
  question_id: string;
  option_text: string;
  is_correct?: boolean; // Hidden from students before submission
  sort_order: number;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  user_id: string;
  attempt_number: number;
  score_percentage: number;
  is_passed: boolean;
  started_at: string;
  submitted_at: string;
  answers?: QuizAnswer[];
}

export interface QuizAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  selected_option_id?: string | null;
  is_correct: boolean;
}

export interface Certificate {
  id: string;
  certificate_code: string;
  user_id: string;
  course_id: string;
  issue_date: string;
  verification_url: string;
  recipient_name: string;
  course_title: string;
  instructor_name: string;
  final_grade_percentage: number;
  created_at: string;
  course?: Course;
}

export interface CourseReview {
  id: string;
  course_id: string;
  user_id: string;
  rating: number;
  comment?: string | null;
  created_at: string;
  user?: Profile;
}

export interface Bookmark {
  id: string;
  user_id: string;
  course_id: string;
  created_at: string;
  course?: Course;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  link?: string | null;
  is_read: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id?: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata: Record<string, any>;
  ip_address?: string | null;
  created_at: string;
  user?: Profile;
}
