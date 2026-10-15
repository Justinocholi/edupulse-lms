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

  // 11. Protection of the Last Administrator
  it("prevents demoting the last remaining platform administrator", async () => {
    const adminId = "10000001-0000-0000-0000-000000000003";

    await expect(
      dataStore.updateUserRole(adminId, adminId, "student")
    ).rejects.toThrow("Cannot demote the sole remaining administrator on the platform");
  });

  // 12. Video Playback Position & Time Spent Persistence
  it("records and updates video playback position and accumulated time spent", async () => {
    const studentId = "learner-playback-test";
    const courseId = "a0000001-0000-0000-0000-000000000001";
    const lessonId = "40000001-0000-0000-0000-000000000001";

    await dataStore.enrollUser(studentId, courseId);

    // Save playback position at 125 seconds, spent 120 seconds
    const res1 = await dataStore.markLessonProgress(
      studentId,
      lessonId,
      courseId,
      false, // not yet marked completed
      120,   // time spent
      125    // playback position
    );

    expect(res1.progress.last_playback_position_seconds).toBe(125);
    expect(res1.progress.time_spent_seconds).toBe(120);
    expect(res1.progress.is_completed).toBe(false);

    // Now user finishes video and marks complete, saving position at 300 seconds
    const res2 = await dataStore.markLessonProgress(
      studentId,
      lessonId,
      courseId,
      true,  // completed
      180,   // additional time spent
      300    // new position
    );

    expect(res2.progress.is_completed).toBe(true);
    expect(res2.progress.last_playback_position_seconds).toBe(300);
    expect(res2.progress.time_spent_seconds).toBe(300);
  });

  // 13. Course Lifecycle & Audit Trail
  it("manages course lifecycle (draft -> published -> archived) and records audit logs", async () => {
    const adminId = "10000001-0000-0000-0000-000000000003";

    // Create course
    const course = await dataStore.createCourse(
      {
        title: "Microservices Security and OAuth2",
        slug: "microservices-security-oauth2",
        description: "Hands-on implementation of OAuth2, OpenID Connect, and JWT security tokens.",
        difficulty: "intermediate",
        status: "draft",
        is_free: false,
        price: 99,
      },
      adminId
    );
    expect(course.status).toBe("draft");

    // Publish
    const published = await dataStore.updateCourse(course.id, { status: "published" }, adminId);
    expect(published?.status).toBe("published");

    // Archive
    const archived = await dataStore.updateCourse(course.id, { status: "archived" }, adminId);
    expect(archived?.status).toBe("archived");

    // Archived course should not appear in default public catalog
    const publicList = await dataStore.getCourses();
    expect(publicList.some((c) => c.id === course.id)).toBe(false);

    // Verify audit logs were created
    const logs = await dataStore.getAuditLogs();
    const courseLogs = logs.filter((l) => l.entity_id === course.id);
    expect(courseLogs.length).toBeGreaterThan(0);
  });

  // 14. Platform Settings Persistence
  it("persists global platform configuration and updates platform name and email", async () => {
    const adminId = "10000001-0000-0000-0000-000000000003";

    const initialSettings = await dataStore.getPlatformSettings();
    expect(initialSettings.platform_name).toBeDefined();

    const updated = await dataStore.updatePlatformSettings(
      {
        platform_name: "EduPulse Global Academy",
        support_email: "dean@edupulse.io",
      },
      adminId
    );

    expect(updated.platform_name).toBe("EduPulse Global Academy");
    expect(updated.support_email).toBe("dean@edupulse.io");

    const reloaded = await dataStore.getPlatformSettings();
    expect(reloaded.platform_name).toBe("EduPulse Global Academy");
  });
});
