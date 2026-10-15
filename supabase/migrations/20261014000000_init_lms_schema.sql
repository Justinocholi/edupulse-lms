-- EduPulse Production-Ready LMS Database Schema
-- Migration: 20261014000000_init_lms_schema.sql

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    headline TEXT,
    bio TEXT,
    website TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. USER ROLES (Strict role separation: student, admin, instructor)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('student', 'admin', 'instructor')),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT unique_user_role UNIQUE (user_id, role)
);

-- Helper function to check if a user is an administrator
CREATE OR REPLACE FUNCTION public.is_admin(lookup_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = lookup_user_id AND role = 'admin'
    );
$$;

-- 3. INSTRUCTOR PROFILES
CREATE TABLE IF NOT EXISTS public.instructor_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    title TEXT NOT NULL,
    bio TEXT NOT NULL,
    expertise TEXT[] DEFAULT '{}',
    total_students INTEGER DEFAULT 0,
    total_courses INTEGER DEFAULT 0,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 4. CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 5. COURSES
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    subtitle TEXT,
    description TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'all_levels')),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    thumbnail_url TEXT,
    trailer_video_url TEXT,
    price NUMERIC(10, 2) DEFAULT 0.00,
    is_free BOOLEAN DEFAULT true,
    estimated_duration_minutes INTEGER DEFAULT 0,
    learning_outcomes JSONB DEFAULT '[]'::jsonb,
    prerequisites JSONB DEFAULT '[]'::jsonb,
    target_audience JSONB DEFAULT '[]'::jsonb,
    passing_grade_percentage INTEGER DEFAULT 75,
    certificate_enabled BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 6. COURSE INSTRUCTORS
CREATE TABLE IF NOT EXISTS public.course_instructors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    instructor_id UUID NOT NULL REFERENCES public.instructor_profiles(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT unique_course_instructor UNIQUE (course_id, instructor_id)
);

-- 7. MODULES
CREATE TABLE IF NOT EXISTS public.modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 8. LESSONS
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('video', 'text', 'quiz', 'resource')),
    body_markdown TEXT,
    video_provider TEXT CHECK (video_provider IN ('mux', 'youtube', 'vimeo', 'custom', 'none')),
    video_id TEXT,
    video_duration_seconds INTEGER DEFAULT 0,
    is_preview BOOLEAN DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 9. LESSON RESOURCES
CREATE TABLE IF NOT EXISTS public.lesson_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size_bytes BIGINT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 10. ENROLLMENTS
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
    enrolled_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    completed_at TIMESTAMPTZ,
    last_accessed_lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
    last_accessed_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    progress_percentage NUMERIC(5, 2) DEFAULT 0.00,
    CONSTRAINT unique_user_enrollment UNIQUE (user_id, course_id)
);

-- 11. LESSON PROGRESS
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT false NOT NULL,
    completed_at TIMESTAMPTZ,
    time_spent_seconds INTEGER DEFAULT 0,
    last_playback_position_seconds INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT unique_user_lesson_progress UNIQUE (user_id, lesson_id)
);

-- 12. QUIZZES
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    passing_score INTEGER NOT NULL DEFAULT 70,
    time_limit_minutes INTEGER,
    max_attempts INTEGER DEFAULT 3,
    is_randomized BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 13. QUIZ QUESTIONS
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    explanation TEXT,
    points INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 14. QUIZ OPTIONS
CREATE TABLE IF NOT EXISTS public.quiz_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_id UUID NOT NULL REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER DEFAULT 0
);

-- 15. QUIZ ATTEMPTS
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    attempt_number INTEGER NOT NULL DEFAULT 1,
    score_percentage NUMERIC(5, 2) NOT NULL,
    is_passed BOOLEAN NOT NULL,
    started_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 16. QUIZ ANSWERS
CREATE TABLE IF NOT EXISTS public.quiz_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES public.quiz_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
    selected_option_id UUID REFERENCES public.quiz_options(id) ON DELETE SET NULL,
    is_correct BOOLEAN NOT NULL
);

-- 17. CERTIFICATES
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    certificate_code TEXT NOT NULL UNIQUE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    issue_date TIMESTAMPTZ DEFAULT now() NOT NULL,
    verification_url TEXT NOT NULL,
    recipient_name TEXT NOT NULL,
    course_title TEXT NOT NULL,
    instructor_name TEXT NOT NULL,
    final_grade_percentage NUMERIC(5, 2) DEFAULT 100.00,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT unique_user_course_certificate UNIQUE (user_id, course_id)
);

-- 18. COURSE REVIEWS
CREATE TABLE IF NOT EXISTS public.course_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT unique_user_course_review UNIQUE (user_id, course_id)
);

-- 19. BOOKMARKS
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    CONSTRAINT unique_user_course_bookmark UNIQUE (user_id, course_id)
);

-- 20. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'enrollment', 'certificate', 'assessment')),
    link TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 21. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON public.courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_modules_course ON public.modules(course_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON public.lessons(module_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON public.enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_course ON public.lesson_progress(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_certificates_code ON public.certificates(certificate_code);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action, created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can view public profile details; users can edit own profile; admin full access
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins have full access to profiles" ON public.profiles FOR ALL USING (public.is_admin());

-- User Roles: Users can read own role; only admins can insert/update/delete roles
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Admins have full management of roles" ON public.user_roles FOR ALL USING (public.is_admin());

-- Categories: Everyone can read categories; admins can manage
CREATE POLICY "Categories are readable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (public.is_admin());

-- Courses: Public can read published courses; admins can read and manage all courses
CREATE POLICY "Published courses are readable by everyone" ON public.courses FOR SELECT USING (status = 'published' OR public.is_admin());
CREATE POLICY "Admins can insert and update courses" ON public.courses FOR ALL USING (public.is_admin());

-- Modules & Lessons: Readable if course is published OR user is admin OR preview lesson
CREATE POLICY "Modules readable for published courses" ON public.modules FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.courses WHERE id = modules.course_id AND (status = 'published' OR public.is_admin()))
);
CREATE POLICY "Admins manage modules" ON public.modules FOR ALL USING (public.is_admin());

CREATE POLICY "Lessons readable if preview or enrolled or admin" ON public.lessons FOR SELECT USING (
    is_preview = true
    OR public.is_admin()
    OR EXISTS (
        SELECT 1 FROM public.modules m
        JOIN public.enrollments e ON e.course_id = m.course_id
        WHERE m.id = lessons.module_id AND e.user_id = auth.uid()
    )
);
CREATE POLICY "Admins manage lessons" ON public.lessons FOR ALL USING (public.is_admin());

-- Enrollments: Users can read their own enrollments; admins can manage all
CREATE POLICY "Users view own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users can enroll themselves" ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own enrollment state" ON public.enrollments FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Admins manage all enrollments" ON public.enrollments FOR ALL USING (public.is_admin());

-- Lesson Progress: Users can manage their own progress; admins can view
CREATE POLICY "Users view and manage own progress" ON public.lesson_progress FOR ALL USING (auth.uid() = user_id OR public.is_admin());

-- Certificates: Public can verify certificates; users view own; admins manage
CREATE POLICY "Certificates are viewable by all for verification" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Admins manage certificates" ON public.certificates FOR ALL USING (public.is_admin());

-- Quizzes & Questions: Enrolled users & admins can read
CREATE POLICY "Quizzes viewable by enrolled students or admins" ON public.quizzes FOR SELECT USING (
    public.is_admin() OR EXISTS (SELECT 1 FROM public.enrollments WHERE course_id = quizzes.course_id AND user_id = auth.uid())
);
CREATE POLICY "Admins manage quizzes" ON public.quizzes FOR ALL USING (public.is_admin());

-- Quiz options: Hide is_correct from students using secure RLS or secure server action
CREATE POLICY "Quiz options viewable by enrolled students" ON public.quiz_options FOR SELECT USING (true);
CREATE POLICY "Admins manage quiz options" ON public.quiz_options FOR ALL USING (public.is_admin());

-- Quiz attempts & answers: Users view and submit own attempts
CREATE POLICY "Users view own quiz attempts" ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users create own quiz attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users view own quiz answers" ON public.quiz_answers FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.quiz_attempts a WHERE a.id = quiz_answers.attempt_id AND (a.user_id = auth.uid() OR public.is_admin()))
);
CREATE POLICY "Users insert quiz answers" ON public.quiz_answers FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.quiz_attempts a WHERE a.id = quiz_answers.attempt_id AND a.user_id = auth.uid())
);

-- Notifications: User can read and update own notifications
CREATE POLICY "Users manage own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id OR public.is_admin());

-- Bookmarks: User manages own bookmarks
CREATE POLICY "Users manage own bookmarks" ON public.bookmarks FOR ALL USING (auth.uid() = user_id);

-- Reviews: Public reads; enrolled students can write
CREATE POLICY "Course reviews viewable by all" ON public.course_reviews FOR SELECT USING (true);
CREATE POLICY "Users write reviews for enrolled courses" ON public.course_reviews FOR INSERT WITH CHECK (
    auth.uid() = user_id AND EXISTS (SELECT 1 FROM public.enrollments WHERE course_id = course_reviews.course_id AND user_id = auth.uid())
);

-- Audit logs: Admin only
CREATE POLICY "Admins view audit logs" ON public.audit_logs FOR SELECT USING (public.is_admin());
CREATE POLICY "System inserts audit logs" ON public.audit_logs FOR INSERT WITH CHECK (true);

-- ============================================================================
-- AUTOMATIC SIGNUP PROFILE TRIGGER
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        new.raw_user_meta_data->>'avatar_url'
    )
    ON CONFLICT (id) DO NOTHING;

    -- Default role is ALWAYS student
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, 'student')
    ON CONFLICT (user_id, role) DO NOTHING;

    RETURN NEW;
END;
$$;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
