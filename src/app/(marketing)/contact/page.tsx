import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contact Us | Teacher Home Secondary School Lokoja",
  description:
    "Ask a question, schedule an on-campus tour, or enquire about 2026/2027 admissions in Peace Community, Lokoja.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-16 px-6 max-w-5xl space-y-16">
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-[#003366] dark:text-[#66b2ff]">
          Get In Touch
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-[#003366] dark:text-white">
          We would love to meet your family
        </h1>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Ask a question, schedule an on-campus tour, or enquire about admissions in Peace Community, Lokoja.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-foreground">
            School Address &amp; Hours
          </h2>
          <div className="space-y-4 text-xs md:text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-[#003366] dark:text-[#66b2ff] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground">Teacher Home Secondary School</p>
                <p className="text-muted-foreground">Peace Community, Lokoja, Kogi State, Nigeria</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-[#003366] dark:text-[#66b2ff] shrink-0" />
              <a href="tel:+2348031234567" className="hover:underline">
                +234 803 123 4567
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-[#003366] dark:text-[#66b2ff] shrink-0" />
              <a href="mailto:info@teacherhomeschool.com" className="hover:underline">
                info@teacherhomeschool.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-[#003366] dark:text-[#66b2ff] shrink-0" />
              <span>Monday – Friday: 7:30 AM – 3:30 PM</span>
            </div>
          </div>
        </div>

        {/* Direct Email Form */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-foreground">Send an Enquiry</h2>
          <form
            action="mailto:info@teacherhomeschool.com"
            method="GET"
            className="space-y-4"
          >
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Your Name</label>
              <input
                name="name"
                required
                placeholder="Parent / Guardian Name"
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Phone</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="080 1234 5678"
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Message</label>
              <textarea
                name="body"
                required
                rows={4}
                placeholder="Please describe how we can assist you..."
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-[#003366] text-white hover:bg-[#002a54] font-bold text-xs"
            >
              Submit Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
