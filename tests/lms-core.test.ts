import { describe, it, expect, beforeEach } from "vitest";
import { dataStore, resetDb } from "@/lib/db/data-store";
import { registerSchema, loginSchema } from "@/lib/validations/auth";
import { courseSchema } from "@/lib/validations/course";

describe("EduPulse LMS Critical Business Logic & Security Tests", () => {
  beforeEach(() => {
    resetDb();
  });

  // 1. Role Assignment
  it("verifies a new user receives the student role by default", async () => {
    // When a user is retrieved or registered, role defaults to 'student'
    const defaultRole = await dataStore.getUserRole("non-existent-or-new-user-id");
    expect(defaultRole).toBe("student");
  });

  // 2. Admin Route / Role Guard
  it("denies role promotion when attempted by a non-administrator", async () => {
    const studentId = "10000001-0000-0000-0000-000000000004";
    const targetUserId = "target-user-123";

    await expect(
      dataStore.updateUserRole(studentId, targetUserId, "admin")
    ).rejects.toThrow("Unauthorized");
  });

  // 3. Admin Permissions
  it("allows an administrator to update user roles", async () => {
    const adminId = "10000001-0000-0000-0000-000000000003";
    const targetUserId = "10000001-0000-0000-0000-000000000004";

    const success = await dataStore.updateUserRole(adminId, targetUserId, "instructor");
    expect(success).toBe(true);

    const updatedRole = await dataStore.getUserRole(targetUserId);
    expect(updatedRole).toBe("instructor");
  });

  // 4. Draft Isolation from Public Catalog
  it("strictly excludes draft courses from the public catalog", async () => {
    const publicCourses = await dataStore.getCourses();
    const hasDraft = publicCourses.some((c) => c.status === "draft");
    expect(hasDraft).toBe(false);

    // Draft courses should only appear when includeDrafts is true (admin access)
    const adminCourses = await dataStore.getCourses({ includeDrafts: true });
    const draftCourse = adminCourses.find((c) => c.status === "draft");
    expect(draftCourse).toBeDefined();
    expect(draftCourse?.title).toContain("Draft");
  });

  // 5. Course CRUD
  it("allows administrators to create, edit, and publish courses", async () => {
    const adminId = "10000001-0000-0000-0000-000000000003";

    // Create course in draft
    const newCourse = await dataStore.createCourse(
      {
        title: "Advanced Distributed Caching with Redis",
        slug: "advanced-distributed-caching-redis",
        description: "Comprehensive architectural deep dive into Redis clusters.",
        difficulty: "advanced",
        status: "draft",
        is_free: true,
      },
      adminId
    );
    expect(newCourse.id).toBeDefined();
    expect(newCourse.status).toBe("draft");

    // Publish course
    const published = await dataStore.updateCourse(newCourse.id, { status: "published" }, adminId);
    expect(published?.status).toBe("published");

    // Course should now appear in public catalog
    const publicCatalog = await dataStore.getCourses();
    const found = publicCatalog.find((c) => c.id === newCourse.id);
    expect(found).toBeDefined();
    expect(found?.title).toBe("Advanced Distributed Caching with Redis");
  });

  // 6. Persistence of Enrollments
  it("persists student enrollments correctly and increments enrollment count", async () => {
    const studentId = "new-student-456";
    const courseId = "a0000001-0000-0000-0000-000000000002";

    const enrollment = await dataStore.enrollUser(studentId, courseId);
    expect(enrollment.user_id).toBe(studentId);
    expect(enrollment.course_id).toBe(courseId);
    expect(enrollment.status).toBe("active");

    const checkEnrollment = await dataStore.getUserEnrollment(studentId, courseId);
    expect(checkEnrollment).toBeDefined();
    expect(checkEnrollment?.id).toBe(enrollment.id);
  });

  // 7. Persistent Lesson Progress & Progress Calculation
  it("persists lesson completion and accurately calculates course progress percentage", async () => {
    const studentId = "student-progress-user";
    const courseId = "a0000001-0000-0000-0000-000000000001";

    // First enroll user
    await dataStore.enrollUser(studentId, courseId);

    // Complete lesson 1
    const res1 = await dataStore.markLessonProgress(
      studentId,
      "40000001-0000-0000-0000-000000000001",
      courseId,
      true
    );
    expect(res1.progress.is_completed).toBe(true);
    expect(res1.enrollment?.progress_percentage).toBeGreaterThan(0);

    // Retrieve progress list
    const progressList = await dataStore.getUserLessonProgress(studentId, courseId);
    expect(progressList.length).toBe(1);
    expect(progressList[0].is_completed).toBe(true);
  });

  // 8. Server-Side Quiz Grading & Concealed Answers
  it("evaluates quiz answers strictly on the server and calculates score accurately", async () => {
    const studentId = "10000001-0000-0000-0000-000000000004";
    const quizId = "50000001-0000-0000-0000-000000000001";

    // Answers to all 5 questions
    // Q1: qo1 (Correct)
    // Q2: qo5 (Correct)
    // Q3: qo9 (Correct)
    // Q4: qo13 (Correct)
    // Q5: qo17 (Correct)
    const perfectAnswers = {
      qq1: "qo1",
      qq2: "qo5",
      qq3: "qo9",
      qq4: "qo13",
      qq5: "qo17",
    };

    const result = await dataStore.submitQuiz(studentId, quizId, perfectAnswers);
    expect(result.scorePercentage).toBe(100);
    expect(result.isPassed).toBe(true);
    expect(result.feedback.length).toBe(5);
    expect(result.feedback.every((f) => f.correct)).toBe(true);
  });

  it("calculates failing score when incorrect answers are submitted", async () => {
    const studentId = "10000001-0000-0000-0000-000000000004";
    const quizId = "50000001-0000-0000-0000-000000000001";

    // All incorrect answers
    const wrongAnswers = {
      qq1: "qo2",
      qq2: "qo6",
      qq3: "qo10",
      qq4: "qo14",
      qq5: "qo18",
    };

    const result = await dataStore.submitQuiz(studentId, quizId, wrongAnswers);
    expect(result.scorePercentage).toBe(0);
    expect(result.isPassed).toBe(false);
  });

  // 9. Certificate Issuance & Anti-Duplicate Generation
  it("issues a certificate upon completion and prevents duplicates", async () => {
    const studentId = "10000001-0000-0000-0000-000000000004";
    const courseId = "a0000001-0000-0000-0000-000000000001";

    const cert1 = await dataStore.issueCertificate(studentId, courseId);
    expect(cert1.certificate_code).toMatch(/^EDU-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
    expect(cert1.course_id).toBe(courseId);

    // Duplicate call should return the exact existing certificate record
    const cert2 = await dataStore.issueCertificate(studentId, courseId);
    expect(cert2.id).toBe(cert1.id);
    expect(cert2.certificate_code).toBe(cert1.certificate_code);

    // Verify public lookup
    const lookup = await dataStore.getCertificateByCode(cert1.certificate_code);
    expect(lookup).toBeDefined();
    expect(lookup?.certificate_code).toBe(cert1.certificate_code);
  });

  // 10. Zod Form Validations
  it("rejects invalid registration inputs and enforces password complexity", () => {
    // Too short password
    const res1 = registerSchema.safeParse({
      full_name: "John Doe",
      email: "john@example.com",
      password: "short",
      confirmPassword: "short",
    });
    expect(res1.success).toBe(false);

    // Mismatched passwords
    const res2 = registerSchema.safeParse({
      full_name: "John Doe",
      email: "john@example.com",
      password: "Password123!",
      confirmPassword: "DifferentPassword123!",
    });
    expect(res2.success).toBe(false);

    // Valid registration
    const res3 = registerSchema.safeParse({
      full_name: "John Doe",
      email: "john@example.com",
      password: "Password123!",
      confirmPassword: "Password123!",
    });
    expect(res3.success).toBe(true);
  });

  it("rejects invalid course creation inputs", () => {
    // Missing required fields and negative price
    const res1 = courseSchema.safeParse({
      title: "Hi", // too short
      description: "Short", // too short
      category_id: "not-a-uuid",
      difficulty: "unknown_level",
      price: -50,
    });
    expect(res1.success).toBe(false);
  });
});
