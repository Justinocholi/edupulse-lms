# EduPulse — Enterprise Learning Management System (LMS)

EduPulse is a high-performance, production-ready Learning Management System built to compete with platforms like Coursera, Udemy, and Alison. Engineered with Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase PostgreSQL with Row Level Security (RLS), and secure server-evaluated assessments.

---

## 🚀 Live Demo & Brand Identity

- **Platform Brand**: **EduPulse LMS**
- **Brand Aesthetic**: Deep Obsidian / Indigo base (`#030712`, `#1E1B4B`, `#4F46E5`) with electric teal/cyan accents (`#14B8A6`, `#0D9488`), clean card borders, and accessible dark/light theme switching.
- **Role Modes**:
  - **Student Role**: Default role for all registrations. Access to `/dashboard`, `/dashboard/my-learning`, lesson player, assessments, and verifiable certificates.
  - **Administrator Role**: Restricted access to `/admin`, real-time analytics, course management, visual curriculum builder, user role delegation, review moderation, and security audit logs.

---

## 🛠 Technology Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) with strict type checking
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + CSS Variables
- **Component Primitives**: [shadcn/ui](https://ui.shadcn.com/) + Radix UI architecture
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & Auth**: [Supabase PostgreSQL](https://supabase.com/) with Row Level Security (RLS) policies
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Charts & Telemetry**: [Recharts](https://recharts.org/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Deployment**: Vercel ready

---

## 🏛 Architecture & Project Layout

```text
src/
  app/
    (marketing)/              # Public pages (SEO & landing)
      page.tsx                # Homepage (Hero, Stats, Featured, FAQs)
      courses/                # Course Discovery & Search
        page.tsx              # Catalog with real-time filters
        [slug]/page.tsx       # Course Details & Syllabus breakdown
      categories/page.tsx     # Categories showcase
      instructors/page.tsx    # Expert faculty bios
      about/page.tsx          # About EduPulse
      contact/page.tsx        # Contact advisory
      privacy/page.tsx        # Privacy policy
      terms/page.tsx          # Terms of service
      certificates/[code]/    # Cryptographic certificate verification
    (auth)/                   # Authentication flows
      login/page.tsx          # Sign in with 1-click demo buttons
      register/page.tsx       # Student registration (least privilege)
      forgot-password/        # Password recovery
      reset-password/         # Password update
    dashboard/                # Student Dashboard
      page.tsx                # Overview & momentum stats
      my-learning/page.tsx    # Enrolled, in-progress & completed courses
      assessments/page.tsx    # Quizzes & exam records
      certificates/page.tsx   # Verified credentials vault
      bookmarks/page.tsx      # Saved courses
      notifications/page.tsx  # Activity telemetry
      settings/page.tsx       # Profile settings
    learn/[courseSlug]/       # Immersive Learning Interface
      page.tsx                # Video streaming & lesson player
      quiz/[quizId]/page.tsx  # Server-graded exam player with confetti
    admin/                    # Administrator Dashboard (Protected)
      page.tsx                # Real analytics & growth charts
      courses/                # Course CRUD table
        new/page.tsx          # Course creation blueprint
        [courseId]/edit/      # Course metadata editor
        [courseId]/builder/   # Visual curriculum builder
      users/page.tsx          # User management & role promotion
      categories/page.tsx     # Category taxonomy
      assessments/page.tsx    # Quiz registry
      certificates/page.tsx   # Certificates registry
      reviews/page.tsx        # Review moderation
      audit-logs/page.tsx     # Security audit trail
      settings/page.tsx       # Platform configuration
  components/
    ui/                       # Button, Card, Badge, Input, Tabs, Dialog, Skeleton, Alert, Progress
    layout/                   # Navbar, Footer, StudentSidebar, AdminSidebar, ThemeToggle
    courses/                  # CourseCard, CourseFilter, EnrollButton
    learning/                 # LessonPlayer, QuizRunner
    admin/                    # AnalyticsChart, CurriculumBuilder, CourseForm
  lib/
    supabase/                 # SSR client, server client, and admin helpers
    db/                       # Unified Data Store (Supabase + fallback persistence)
    auth/                     # Session helpers and server actions
    validations/              # Zod validation schemas
    utils.ts                  # Currency, duration, and certificate hash generators
  types/                      # Strict TypeScript database models
supabase/
  migrations/                 # PostgreSQL migrations with RLS policies
  seed.sql                    # Realistic seed curriculum & questions
tests/
  lms-core.test.ts            # Automated security and business logic test suite
```

---

## 🗄 Database Design & Security Policies

The schema includes 21 normalized tables with PostgreSQL Row Level Security (RLS) policies:

1. `profiles`: Extends Supabase auth users.
2. `user_roles`: Manages `student`, `admin`, and `instructor` roles securely.
3. `categories`: Course taxonomy tracks.
4. `courses`: Masterclasses with difficulty, duration, and outcomes.
5. `course_instructors`: Multi-instructor mapping.
6. `modules`: Sequential course chapters.
7. `lessons`: HD video, interactive markdown, and quiz lectures.
8. `lesson_resources`: Downloadable PDFs and architecture blueprints.
9. `enrollments`: Persistent enrollment tracking with percentage progress.
10. `lesson_progress`: Itemized lesson completion and playback timestamps.
11. `quizzes`: Examination records with passing thresholds.
12. `quiz_questions`: Multiple-choice questions with server-side points.
13. `quiz_options`: Concealed answer keys (never exposed to client).
14. `quiz_attempts`: Score percentages, pass/fail states, and timestamps.
15. `quiz_answers`: Audited question answers.
16. `certificates`: Immutable credential codes (`EDU-XXXX-XXXX-XXXX`).
17. `course_reviews`: Learner feedback and star ratings.
18. `bookmarks`: Student saved courses.
19. `notifications`: Real-time user notifications.
20. `audit_logs`: Immutable security audit log for admin operations.
21. `instructor_profiles`: Faculty expertise, student counts, and ratings.

### Security Highlights:
- **Principle of Least Privilege**: New signups automatically receive the `student` role.
- **Server-Side Authorization**: Admin routes and operations check the server session and DB role via `requireAdmin()`.
- **Concealed Answer Keys**: Answer keys are evaluated strictly on the server during `submitQuizAction`.
- **Tamper-Evident Certificates**: Issued only when 100% of curriculum requirements and passing exam scores are met. Duplicate certificates are strictly prevented.

---

## 🧪 Automated Testing

Run the test suite:

```bash
npm test
```

The automated test suite verifies all critical business logic and authorization rules:
- Student role default assignment on signup
- Non-administrators denied administrative role promotion
- Exclusion of draft courses from public discovery
- Administrator course creation, metadata update, and publication
- Enrollment persistence and counter incrementation
- Lesson progress tracking and overall progress recalculation
- Server-side quiz evaluation and score computation
- Tamper-proof certificate code issuance and deduplication
- Zod validation error handling on malformed requests

---

## ⚙️ Quick Start & Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Fill in your Supabase project credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
   *(Note: EduPulse features an in-memory/fallback database adapter pre-seeded with all realistic masterclasses, so the app runs out-of-the-box even before remote credentials are provided!)*

3. **Run local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **One-Click Demo Roles**:
   - On the `/login` page or Navbar menu, click **"Demo Student"** to test learner workflows.
   - Click **"Demo Admin"** to access the complete admin console and curriculum builder.

5. **Run production build**:
   ```bash
   npm run build
   npm run start
   ```
