export * from './database';

export interface UserSession {
  user: {
    id: string;
    email: string;
    full_name: string;
    avatar_url?: string | null;
  } | null;
  role: 'student' | 'admin' | 'instructor' | null;
}

export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  totalEnrollments: number;
  completionRate: number;
  enrollmentTrends: { date: string; enrollments: number }[];
  popularCourses: { id: string; title: string; count: number; category: string }[];
}

export interface StudentDashboardStats {
  enrolledCoursesCount: number;
  inProgressCoursesCount: number;
  completedCoursesCount: number;
  totalLearningMinutes: number;
  overallProgressPercentage: number;
  certificatesEarnedCount: number;
}
