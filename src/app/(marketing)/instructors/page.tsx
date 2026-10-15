import { Star, Users, BookOpen, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Faculty & Expert Instructors | EduPulse",
  description: "Learn directly from leading software architects and infrastructure practitioners.",
};

export default function InstructorsPage() {
  const instructors = [
    {
      name: "Dr. Sarah Chen",
      title: "Principal Cloud Architect & Former Google Tech Lead",
      bio: "Dr. Sarah Chen has 14+ years architecting hyper-scale distributed systems and teaches tens of thousands of cloud engineers globally.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      expertise: ["Cloud Architecture", "Kubernetes", "Go", "AWS"],
      students: "42,500+",
      courses: 8,
      rating: 4.94,
    },
    {
      name: "Marcus Vance",
      title: "Senior Staff Software Engineer & Author",
      bio: "Marcus is an open-source contributor and full-stack veteran specializing in high-throughput Next.js, Node.js, and PostgreSQL deployments.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      expertise: ["Next.js", "React", "PostgreSQL", "TypeScript"],
      students: "31,200+",
      courses: 6,
      rating: 4.91,
    },
  ];

  return (
    <div className="container py-12 px-4 space-y-10">
      <div className="max-w-2xl space-y-3">
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Expert Faculty
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Our instructors are actively building and maintaining hyper-scale software systems at industry-leading companies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {instructors.map((ins, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row gap-6 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ins.avatar}
              alt={ins.name}
              className="h-28 w-28 rounded-2xl object-cover shrink-0 ring-2 ring-brand-500/20"
            />
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading text-xl font-bold text-foreground">{ins.name}</h3>
                  <ShieldCheck className="h-4 w-4 text-teal-500" />
                </div>
                <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-0.5">{ins.title}</p>
              </div>

              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{ins.bio}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {ins.expertise.map((exp, eIdx) => (
                  <Badge key={eIdx} variant="secondary" className="text-[11px]">
                    {exp}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border/60 pt-3">
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {ins.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {ins.students} learners
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {ins.courses} masterclasses
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
