export const metadata = {
  title: "Terms of Service | EduPulse LMS",
  description: "Terms and conditions of use for EduPulse platform.",
};

export default function TermsPage() {
  return (
    <div className="container py-16 px-4 max-w-3xl space-y-6">
      <h1 className="font-heading text-3xl font-extrabold text-foreground">Terms of Service</h1>
      <p className="text-xs text-muted-foreground">Effective Date: October 14, 2026</p>

      <div className="prose dark:prose-invert text-sm text-muted-foreground space-y-4">
        <p>
          By accessing or utilizing EduPulse masterclasses, assessments, or certificate registries, you agree to comply with the terms set forth herein.
        </p>
        <h3 className="text-foreground font-semibold text-base">1. Intellectual Property & Course Materials</h3>
        <p>
          Video lessons, architectural blueprints, downloadable code repositories, and quizzes are the exclusive intellectual property of EduPulse and their respective instructors.
        </p>
        <h3 className="text-foreground font-semibold text-base">2. Assessment Integrity & Fraud Prevention</h3>
        <p>
          Learners must complete examinations independently. Certificates obtained through automated answer scraping or credential fabrication are subject to immediate revocation and account suspension.
        </p>
      </div>
    </div>
  );
}
