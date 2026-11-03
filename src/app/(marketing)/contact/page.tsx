import { Mail, MessageSquare, Terminal, Video, HelpCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contact & Support | EduPulse LMS",
  description:
    "Get in touch with the EduPulse LMS platform team for course inquiries, enterprise cohort training, or technical assistance.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-16 px-4 md:px-6 max-w-5xl space-y-16">
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          EduPulse Support &amp; Partnerships
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground">
          How Can We Help You?
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Have questions about a course curriculum, joining a live cohort batch, enterprise licensing, or teaching on EduPulse? Our team is here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Support Channels */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Course &amp; Lesson Support</h3>
                <p className="text-xs text-muted-foreground">Stuck on a specific lesson or quiz problem?</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Post directly inside our <a href="/discussions" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">Community Discussions</a> forum to get guidance from course instructors and fellow engineers.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Live Cohorts &amp; Batches</h3>
                <p className="text-xs text-muted-foreground">Inquiries regarding Zoom schedules and batch enrollment</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Need assistance scheduling a private team cohort or adjusting your batch timetable? Reach out to <span className="font-mono text-foreground font-semibold">cohorts@edupulse.io</span>.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Platform Administration</h3>
                <p className="text-xs text-muted-foreground">Partnership, licensing, and general inquiries</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              For institutional licensing and instructor onboarding: <span className="font-mono text-foreground font-semibold">support@edupulse.io</span>
            </p>
          </div>
        </div>

        {/* Direct Enquiry Form */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-foreground">Send Us a Direct Message</h2>
          <form
            action="mailto:support@edupulse.io"
            method="GET"
            className="space-y-4"
          >
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Full Name</label>
              <input
                name="name"
                required
                placeholder="Jane Doe"
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Work Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="jane@company.com"
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Inquiry Category</label>
              <select
                name="category"
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="course_support">Course Curriculum Support</option>
                <option value="batch_cohort">Live Batch &amp; Cohort Inquiries</option>
                <option value="enterprise_team">Enterprise Team Training</option>
                <option value="instructor_application">Apply to Teach on EduPulse</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Message</label>
              <textarea
                name="body"
                required
                rows={4}
                placeholder="How can we assist you or your engineering team?"
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs"
            >
              Submit Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
