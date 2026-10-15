export const metadata = {
  title: "Privacy Policy | EduPulse LMS",
  description: "EduPulse user privacy principles and data protection policies.",
};

export default function PrivacyPage() {
  return (
    <div className="container py-16 px-4 max-w-3xl space-y-6">
      <h1 className="font-heading text-3xl font-extrabold text-foreground">Privacy Policy</h1>
      <p className="text-xs text-muted-foreground">Effective Date: October 14, 2026</p>

      <div className="prose dark:prose-invert text-sm text-muted-foreground space-y-4">
        <p>
          At EduPulse, safeguarding your confidential learning data, assessment results, and account credentials is foundational to our mission.
        </p>
        <h3 className="text-foreground font-semibold text-base">1. Data Architecture & RLS Protection</h3>
        <p>
          User telemetry, lesson progress, and quiz attempts are isolated via PostgreSQL Row Level Security (RLS). No learner can read or tamper with another learner&apos;s grades or credentials.
        </p>
        <h3 className="text-foreground font-semibold text-base">2. Storage of Personal Information</h3>
        <p>
          We store your name, email, avatar image, and certificate records securely. Sensitive credentials such as database service keys are stored strictly in server-side vaults and never transmitted to the browser.
        </p>
      </div>
    </div>
  );
}
