-- EduPulse Production-Ready LMS Seed Data
-- PostgreSQL-compliant valid UUIDs and realistic sample curriculum

-- 0. Ensure foreign key on profiles does not block demo profile seeding
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Ensure public read policies exist for instructors
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'instructor_profiles' AND policyname = 'Instructor profiles readable by everyone'
    ) THEN
        CREATE POLICY "Instructor profiles readable by everyone" ON public.instructor_profiles FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'course_instructors' AND policyname = 'Course instructors readable by everyone'
    ) THEN
        CREATE POLICY "Course instructors readable by everyone" ON public.course_instructors FOR SELECT USING (true);
    END IF;
END $$;

-- 1. Categories
INSERT INTO public.categories (id, name, slug, description, icon, sort_order) VALUES
('c0000001-0000-0000-0000-000000000001', 'Web & Mobile Development', 'web-development', 'Master modern web applications with Next.js, React, TypeScript, and cloud architectures.', 'Code2', 1),
('c0000001-0000-0000-0000-000000000002', 'Cloud & DevOps Engineering', 'cloud-devops', 'Scale infrastructure with Docker, Kubernetes, AWS, CI/CD pipelines, and Terraform.', 'Cloud', 2),
('c0000001-0000-0000-0000-000000000003', 'Artificial Intelligence & Data', 'ai-data-science', 'Deep learning, LLMs, neural networks, computer vision, and predictive analytics.', 'Cpu', 3),
('c0000001-0000-0000-0000-000000000004', 'Cybersecurity & Ethical Hacking', 'cybersecurity', 'Defensive security, penetration testing, threat hunting, and zero-trust engineering.', 'ShieldCheck', 4),
('c0000001-0000-0000-0000-000000000005', 'Product Design & UX Systems', 'product-design', 'Design systems, micro-interactions, Figma tokens, accessibility, and user research.', 'Palette', 5)
ON CONFLICT (id) DO NOTHING;

-- 2. Demo Profiles
INSERT INTO public.profiles (id, email, full_name, avatar_url, headline, bio) VALUES
('10000001-0000-0000-0000-000000000001', 'sarah.chen@edupulse.io', 'Dr. Sarah Chen', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80', 'Principal Cloud Architect & Former Google Tech Lead', 'Dr. Sarah Chen has 14+ years architecting hyper-scale distributed systems and teaches tens of thousands of cloud engineers globally.'),
('10000001-0000-0000-0000-000000000002', 'marcus.vance@edupulse.io', 'Marcus Vance', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', 'Senior Staff Software Engineer & Author', 'Marcus is an open-source contributor and full-stack veteran specializing in high-throughput Next.js, Node.js, and PostgreSQL deployments.'),
('10000001-0000-0000-0000-000000000003', 'admin@edupulse.io', 'Platform Administrator', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80', 'EduPulse Super Admin', 'Oversees curriculum standards, tenant security, and system metrics.'),
('10000001-0000-0000-0000-000000000004', 'student@edupulse.io', 'Alex Rivera', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80', 'Senior Full-Stack Developer', 'Continuous learner scaling enterprise systems.')
ON CONFLICT (id) DO NOTHING;

-- 3. Demo User Roles
INSERT INTO public.user_roles (id, user_id, role) VALUES
('80000001-0000-0000-0000-000000000001', '10000001-0000-0000-0000-000000000001', 'instructor'),
('80000001-0000-0000-0000-000000000002', '10000001-0000-0000-0000-000000000002', 'instructor'),
('80000001-0000-0000-0000-000000000003', '10000001-0000-0000-0000-000000000003', 'admin'),
('80000001-0000-0000-0000-000000000004', '10000001-0000-0000-0000-000000000004', 'student')
ON CONFLICT (user_id, role) DO NOTHING;

-- 4. Instructor Profiles
INSERT INTO public.instructor_profiles (id, user_id, title, bio, expertise, total_students, total_courses, rating, verified) VALUES
('20000001-0000-0000-0000-000000000001', '10000001-0000-0000-0000-000000000001', 'Principal Cloud Architect', 'Specialist in Kubernetes, Cloud Native, and Zero-Downtime Migration.', ARRAY['Cloud Architecture', 'Kubernetes', 'Go', 'AWS'], 42500, 8, 4.94, true),
('20000001-0000-0000-0000-000000000002', '10000001-0000-0000-0000-000000000002', 'Senior Staff Software Engineer', 'Passionate educator on Next.js, TypeScript, React Server Components, and Database Design.', ARRAY['Next.js', 'React', 'PostgreSQL', 'TypeScript'], 31200, 6, 4.91, true)
ON CONFLICT (id) DO NOTHING;

-- 5. Courses
INSERT INTO public.courses (
    id, title, slug, subtitle, description, category_id, difficulty, status,
    thumbnail_url, trailer_video_url, price, is_free, estimated_duration_minutes,
    learning_outcomes, prerequisites, target_audience, passing_grade_percentage, certificate_enabled, created_by
) VALUES
(
    'a0000001-0000-0000-0000-000000000001',
    'Enterprise Next.js 14 & Supabase Full-Stack Architecture',
    'enterprise-nextjs-supabase-architecture',
    'Build production-grade applications with Server Components, Row-Level-Security, streaming, and caching.',
    'Dive deep into modern full-stack web development. This hands-on masterclass guides you through building a high-scale SaaS platform from scratch. You will master React Server Components, Next.js App Router conventions, Supabase PostgreSQL, edge caching, server actions, and type-safe schema validations.',
    'c0000001-0000-0000-0000-000000000001',
    'intermediate',
    'published',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    0.00,
    true,
    720,
    '["Architect mission-critical Next.js 14 applications with App Router", "Design robust PostgreSQL schemas with Row-Level Security in Supabase", "Implement secure authentication, session management, and server authorization", "Integrate real-time updates and streaming UI with Suspense", "Deploy and optimize with Vercel edge runtime and cache invalidation strategies"]'::jsonb,
    '["Working knowledge of JavaScript/TypeScript and React fundamentals", "Basic understanding of relational databases and SQL queries"]'::jsonb,
    '["Full-stack engineers looking to elevate enterprise web architecture skills", "Frontend developers transitioning into robust full-stack workflows"]'::jsonb,
    80,
    true,
    '10000001-0000-0000-0000-000000000002'
),
(
    'a0000001-0000-0000-0000-000000000002',
    'Cloud-Native Kubernetes & Distributed Microservices',
    'kubernetes-distributed-microservices',
    'Deploy resilient microservices clusters with Istio service mesh, Prometheus monitoring, and GitOps.',
    'Learn how tech giants design and run ultra-reliable distributed systems. You will construct containerized clusters with Docker and Kubernetes, enforce security policies, manage ingress and service meshes, and configure automated GitOps CI/CD pipelines with ArgoCD.',
    'c0000001-0000-0000-0000-000000000002',
    'advanced',
    'published',
    'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    49.99,
    false,
    960,
    '["Architect multi-cluster Kubernetes deployments with zero downtime", "Implement Istio service mesh for traffic routing and mutual TLS", "Configure end-to-end telemetry with Prometheus, Grafana, and Jaeger", "Automate progressive rollouts using ArgoCD and GitOps"]'::jsonb,
    '["Familiarity with Linux command line and Docker container basics", "Understanding of network protocols like HTTP, TCP, and DNS"]'::jsonb,
    '["DevOps engineers, Cloud architects, and Backend system developers"]'::jsonb,
    75,
    true,
    '10000001-0000-0000-0000-000000000001'
),
(
    'a0000001-0000-0000-0000-000000000003',
    'Production AI Engineering & LLM Application Development',
    'production-ai-llm-engineering',
    'Build production-grade agentic AI workflows, vector search, RAG pipelines, and fine-tuned embeddings.',
    'Go beyond toy chatbot prompts. This comprehensive course prepares you to engineer robust AI software using semantic caching, retrieval-augmented generation (RAG), vector databases (pgvector), evaluation frameworks, and multi-agent coordination.',
    'c0000001-0000-0000-0000-000000000003',
    'intermediate',
    'published',
    'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    79.99,
    false,
    600,
    '["Design multi-hop RAG architectures with hybrid vector and keyword search", "Evaluate and guardrail LLM outputs for hallucination prevention", "Implement semantic cache and cost-reduction streaming strategies", "Build reliable autonomous agents using tool calling and state machines"]'::jsonb,
    '["Python and modern TypeScript proficiency", "Basic conceptual understanding of embeddings and tokenization"]'::jsonb,
    '["Software engineers wanting to ship dependable AI-powered products in production"]'::jsonb,
    85,
    true,
    '10000001-0000-0000-0000-000000000002'
),
(
    'a0000001-0000-0000-0000-000000000004',
    'Zero-Trust Architecture & Defensive Cybersecurity',
    'zero-trust-defensive-cybersecurity',
    'Fortify modern networks against advanced persistent threats with identity governance and least privilege.',
    'Comprehensive training on defensive security practices. Master identity and access management, OAuth2/OIDC, network segmentation, secrets vaulting, endpoint threat detection, and incident response runbooks.',
    'c0000001-0000-0000-0000-000000000004',
    'all_levels',
    'published',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    0.00,
    true,
    480,
    '["Implement Zero-Trust access controls across cloud and hybrid environments", "Secure API endpoints against OWASP Top 10 vulnerabilities", "Automate secrets rotation with HashiCorp Vault", "Conduct threat modeling and incident mitigation audits"]'::jsonb,
    '["General IT or software development fundamentals"]'::jsonb,
    '["Security analysts, systems administrators, and proactive backend developers"]'::jsonb,
    70,
    true,
    '10000001-0000-0000-0000-000000000001'
),
(
    'a0000001-0000-0000-0000-000000000005',
    'Design Systems & Accessible UI Micro-Interactions (Draft)',
    'design-systems-micro-interactions',
    'Create unified design tokens, accessible component libraries, and fluid Framer Motion animations.',
    'A masterclass for designers and design engineers crafting institutional-grade component libraries.',
    'c0000001-0000-0000-0000-000000000005',
    'beginner',
    'draft',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    NULL,
    0.00,
    true,
    300,
    '["Build WCAG AAA compliant design components", "Integrate design tokens with Tailwind CSS and Radix UI"]'::jsonb,
    '["Basic HTML/CSS knowledge"]'::jsonb,
    '["Designers and frontend engineers"]'::jsonb,
    70,
    true,
    '10000001-0000-0000-0000-000000000002'
)
ON CONFLICT (id) DO NOTHING;

-- 6. Course Instructors Link
INSERT INTO public.course_instructors (course_id, instructor_id, is_primary) VALUES
('a0000001-0000-0000-0000-000000000001', '20000001-0000-0000-0000-000000000002', true),
('a0000001-0000-0000-0000-000000000002', '20000001-0000-0000-0000-000000000001', true),
('a0000001-0000-0000-0000-000000000003', '20000001-0000-0000-0000-000000000002', true),
('a0000001-0000-0000-0000-000000000004', '20000001-0000-0000-0000-000000000001', true)
ON CONFLICT (course_id, instructor_id) DO NOTHING;

-- 7. Modules for Course 1
INSERT INTO public.modules (id, course_id, title, description, sort_order) VALUES
('30000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000001', 'Module 1: Foundations of Next.js 14 App Router', 'Understanding Server Components, Client boundaries, streaming, and the mental model shift.', 1),
('30000001-0000-0000-0000-000000000002', 'a0000001-0000-0000-0000-000000000001', 'Module 2: Supabase Relational Modeling & Row Level Security', 'Database schema modeling, foreign keys, triggers, and impenetrable PostgreSQL RLS policies.', 2),
('30000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000001', 'Module 3: Server Actions, Data Mutations & Cache Revalidation', 'Executing type-safe mutations with Zod, optimistic UI updates, and tag-based revalidation.', 3),
('30000001-0000-0000-0000-000000000004', 'a0000001-0000-0000-0000-000000000001', 'Module 4: Final Assessment & Certification', 'Validate your complete understanding through comprehensive practical quiz and certification issuance.', 4)
ON CONFLICT (id) DO NOTHING;

-- 8. Lessons for Module 1 & 2 & 4
INSERT INTO public.lessons (id, module_id, title, slug, content_type, body_markdown, video_provider, video_id, video_duration_seconds, is_preview, sort_order) VALUES
(
    '40000001-0000-0000-0000-000000000001',
    '30000001-0000-0000-0000-000000000001',
    'Welcome & Architecture Blueprint',
    'welcome-architecture-blueprint',
    'video',
    '### Welcome to Enterprise Next.js 14 Architecture

In this introductory lesson, we dissect the architecture of enterprise web applications. You will learn:
- The fundamental distinction between **Server Components (RSC)** and **Client Components**.
- How the Next.js compilation step produces minimal JavaScript bundles sent to the client.
- The lifecycle of a request through Middleware, Route Handlers, and Server Actions.

```typescript
// Example: Server Component data fetching without client waterfall
export default async function DashboardPage() {
  const data = await getDashboardMetrics();
  return <MetricsGrid metrics={data} />;
}
```',
    'youtube',
    'dQw4w9WgXcQ',
    480,
    true,
    1
),
(
    '40000001-0000-0000-0000-000000000002',
    '30000001-0000-0000-0000-000000000001',
    'Server Components vs Client Components Deep Dive',
    'rsc-vs-client-components',
    'text',
    '### The RSC Mental Model

When developing with React 18+ and Next.js App Router, every component is a **React Server Component** by default.

#### Key Principles:
1. **Never import server-only code into client components**: Use `"server-only"` packages to protect API keys.
2. **Pass props across boundaries**: Ensure props passed from Server Components to Client Components are serializable.
3. **Move state down**: Keep client boundaries as close to the leaves of your component tree as possible.

#### Decision Matrix:
| Feature | Server Component | Client Component |
| :--- | :--- | :--- |
| Fetch database data | Yes | No (prefer Server) |
| Access backend resources | Yes | No |
| Keep sensitive tokens safe | Yes | No |
| Add `onClick`, `onChange` | No | Yes (`use client`) |
| Use `useState`, `useEffect` | No | Yes (`use client`) |
| Use browser APIs (`window`) | No | Yes (`use client`) |',
    'none',
    NULL,
    0,
    true,
    2
),
(
    '40000001-0000-0000-0000-000000000003',
    '30000001-0000-0000-0000-000000000001',
    'Streaming with Suspense & Instant Loading States',
    'streaming-suspense-loading',
    'video',
    '### Streaming & Progressive Hydration

Learn how `loading.tsx` and React `<Suspense>` boundaries eliminate long blank screens by streaming HTML chunks directly from the edge runtime as data resolves.',
    'youtube',
    'dQw4w9WgXcQ',
    620,
    false,
    3
),
(
    '40000001-0000-0000-0000-000000000004',
    '30000001-0000-0000-0000-000000000002',
    'Configuring PostgreSQL Schema & RLS in Supabase',
    'supabase-schema-rls',
    'video',
    '### Defense-in-Depth Database Security

In this lesson, we write custom PostgreSQL Row Level Security policies to guarantee that students cannot inspect or modify records outside their authorized tenancy.',
    'youtube',
    'dQw4w9WgXcQ',
    780,
    false,
    4
),
(
    '40000001-0000-0000-0000-000000000005',
    '30000001-0000-0000-0000-000000000004',
    'Final Course Assessment: Enterprise Architecture',
    'final-assessment-enterprise-architecture',
    'quiz',
    '### Comprehensive Architecture Knowledge Check

Test your mastery of Next.js 14, Supabase RLS, Server Actions, and system scalability. A passing grade of 80% or higher is required to unlock your verified course certificate.',
    'none',
    NULL,
    0,
    false,
    5
)
ON CONFLICT (id) DO NOTHING;

-- 9. Quiz for Course 1
INSERT INTO public.quizzes (id, course_id, lesson_id, title, description, passing_score, time_limit_minutes, max_attempts, is_randomized) VALUES
(
    '50000001-0000-0000-0000-000000000001',
    'a0000001-0000-0000-0000-000000000001',
    '40000001-0000-0000-0000-000000000005',
    'Enterprise Architecture Certification Exam',
    'Complete this 5-question exam to verify your mastery of Next.js App Router and Supabase RLS.',
    80,
    15,
    3,
    false
)
ON CONFLICT (id) DO NOTHING;

-- 10. Quiz Questions
INSERT INTO public.quiz_questions (id, quiz_id, question_text, explanation, points, sort_order) VALUES
(
    '60000001-0000-0000-0000-000000000001',
    '50000001-0000-0000-0000-000000000001',
    'By default in Next.js 14 App Router, what kind of components are created in the app directory?',
    'All components inside the app directory are React Server Components (RSC) unless marked with the "use client" directive.',
    20,
    1
),
(
    '60000001-0000-0000-0000-000000000002',
    '50000001-0000-0000-0000-000000000001',
    'Why is Row Level Security (RLS) critical when using Supabase in client or server environments?',
    'RLS enforces authorization policies at the database layer, ensuring that even if client-side or API checks are bypassed, unauthorized access is rejected.',
    20,
    2
),
(
    '60000001-0000-0000-0000-000000000003',
    '50000001-0000-0000-0000-000000000001',
    'Where should Supabase Service Role keys be stored and accessed?',
    'The Service Role key has superuser privileges and must NEVER be exposed to the client or browser; it must reside only in server-side environment variables.',
    20,
    3
),
(
    '60000001-0000-0000-0000-000000000004',
    '50000001-0000-0000-0000-000000000001',
    'What is the recommended function to bust cached data after a Server Action mutation?',
    'revalidatePath or revalidateTag invalidates cached route segments or tagged fetch requests.',
    20,
    4
),
(
    '60000001-0000-0000-0000-000000000005',
    '50000001-0000-0000-0000-000000000001',
    'Which role is assigned to newly registered users by default in the EduPulse platform?',
    'Security best practices require the principle of least privilege: all new signups receive the Student role.',
    20,
    5
)
ON CONFLICT (id) DO NOTHING;

-- 11. Quiz Options
INSERT INTO public.quiz_options (id, question_id, option_text, is_correct, sort_order) VALUES
-- Q1
('70000001-0000-0000-0000-000000000001', '60000001-0000-0000-0000-000000000001', 'React Server Components (RSC)', true, 1),
('70000001-0000-0000-0000-000000000002', '60000001-0000-0000-0000-000000000001', 'Client Components requiring browser hydration', false, 2),
('70000001-0000-0000-0000-000000000003', '60000001-0000-0000-0000-000000000001', 'Static HTML-only templates without React runtime', false, 3),
('70000001-0000-0000-0000-000000000004', '60000001-0000-0000-0000-000000000001', 'Web Components', false, 4),

-- Q2
('70000001-0000-0000-0000-000000000005', '60000001-0000-0000-0000-000000000002', 'It enforces authorization policies natively at the PostgreSQL database engine layer', true, 1),
('70000001-0000-0000-0000-000000000006', '60000001-0000-0000-0000-000000000002', 'It encrypts hard drives on the server host', false, 2),
('70000001-0000-0000-0000-000000000007', '60000001-0000-0000-0000-000000000002', 'It automatically hides navigation buttons in the frontend UI', false, 3),
('70000001-0000-0000-0000-000000000008', '60000001-0000-0000-0000-000000000002', 'It replaces password hashing algorithms', false, 4),

-- Q3
('70000001-0000-0000-0000-000000000009', '60000001-0000-0000-0000-000000000003', 'Exclusively in server-side environment variables, never accessible in browser code', true, 1),
('70000001-0000-0000-0000-000000000010', '60000001-0000-0000-0000-000000000003', 'In public GitHub repositories for CI/CD convenience', false, 2),
('70000001-0000-0000-0000-000000000011', '60000001-0000-0000-0000-000000000003', 'In browser localStorage for persistent sessions', false, 3),
('70000001-0000-0000-0000-000000000012', '60000001-0000-0000-0000-000000000003', 'Embedded directly inside HTML meta tags', false, 4),

-- Q4
('70000001-0000-0000-0000-000000000013', '60000001-0000-0000-0000-000000000004', 'revalidatePath() or revalidateTag()', true, 1),
('70000001-0000-0000-0000-000000000014', '60000001-0000-0000-0000-000000000004', 'window.location.reload()', false, 2),
('70000001-0000-0000-0000-000000000015', '60000001-0000-0000-0000-000000000004', 'localStorage.clear()', false, 3),
('70000001-0000-0000-0000-000000000016', '60000001-0000-0000-0000-000000000004', 'router.forward()', false, 4),

-- Q5
('70000001-0000-0000-0000-000000000017', '60000001-0000-0000-0000-000000000005', 'Student role', true, 1),
('70000001-0000-0000-0000-000000000018', '60000001-0000-0000-0000-000000000005', 'Administrator role', false, 2),
('70000001-0000-0000-0000-000000000019', '60000001-0000-0000-0000-000000000005', 'Superuser / Root role', false, 3),
('70000001-0000-0000-0000-000000000020', '60000001-0000-0000-0000-000000000005', 'Instructor role', false, 4)
ON CONFLICT (id) DO NOTHING;
