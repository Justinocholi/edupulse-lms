-- Migration: 20261015000000_add_announcements_and_settings.sql
-- Adds announcements, platform settings, and ensures all RLS policies are complete

-- 1. ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    is_published BOOLEAN DEFAULT true,
    published_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. PLATFORM SETTINGS
CREATE TABLE IF NOT EXISTS public.platform_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

-- Enable RLS
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

-- Announcements RLS
CREATE POLICY "Published announcements are viewable by everyone" ON public.announcements 
    FOR SELECT USING (is_published = true OR public.is_admin());

CREATE POLICY "Admins have full management of announcements" ON public.announcements 
    FOR ALL USING (public.is_admin());

-- Platform Settings RLS
CREATE POLICY "Platform settings are readable by everyone" ON public.platform_settings 
    FOR SELECT USING (true);

CREATE POLICY "Admins have full management of platform settings" ON public.platform_settings 
    FOR ALL USING (public.is_admin());

-- Insert default platform settings if not present
INSERT INTO public.platform_settings (key, value) VALUES
(
    'general',
    '{
        "platform_name": "EduPulse",
        "support_email": "support@edupulse.io",
        "allow_public_registration": true,
        "default_currency": "USD",
        "certificate_prefix": "EDU"
    }'::jsonb
)
ON CONFLICT (key) DO NOTHING;
