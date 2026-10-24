"use client";

import * as React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  Laptop,
  Trophy,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  FileText,
  ClipboardCheck,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Shield,
  Sparkles,
  School,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NewsPost {
  slug: string;
  title: string;
  category: "Admissions" | "Achievements" | "Events" | "Announcements";
  date: string;
  dateDisplay: string;
  image: string;
  excerpt: string;
  body: string[];
}

const BULLETIN_POSTS: NewsPost[] = [
  {
    slug: "admissions-open-2026-2027",
    title: "Admissions Open for 2026/2027 Academic Session",
    category: "Admissions",
    date: "2026-10-15",
    dateDisplay: "Oct 2026",
    image: "/assets/classroom.png",
    excerpt: "Applications are now being accepted for JSS1 to SSS2. Begin your child's journey with us today.",
    body: [
      "We are delighted to announce that admissions for the 2026/2027 academic session are now officially open at Teacher Home Secondary School. Families seeking a disciplined, caring and technology-forward learning environment are warmly invited to apply.",
      "Applications are currently being accepted for JSS1 through SSS2, subject to available places and the outcome of our entrance assessment. Each applicant completes an age-appropriate academic assessment that helps us understand their current level and the support they may need.",
      "To begin the process, complete the online application form and bring the required documents to the admissions office. Our team will guide you through every step, from document review to the final admission decision.",
      "We look forward to welcoming new families into our learning community and supporting every child to do their best work and become their best self.",
    ],
  },
  {
    slug: "students-excel-inter-school",
    title: "Students Excel in Kogi State Inter-School Competition",
    category: "Achievements",
    date: "2026-09-28",
    dateDisplay: "Sep 2026",
    image: "/assets/science-lab.jpg",
    excerpt: "Our learners brought home medals in science, mathematics and sports at the Kogi State finals.",
    body: [
      "Teacher Home Secondary School students have once again demonstrated excellence beyond the classroom, bringing home multiple medals at the Kogi State Inter-School Competition finals.",
      "Our learners competed across science, mathematics and sporting events, demonstrating both academic rigour and outstanding teamwork. The results reflect the dedication of our students and the commitment of our teaching staff.",
      "We are particularly proud of the students who balanced preparation for their regular studies with competition training, showing the kind of discipline and resilience we seek to develop in every learner.",
      "Congratulations to all participants and to the teachers who guided them. We look forward to continuing this tradition of excellence in future competitions.",
    ],
  },
  {
    slug: "annual-cultural-day",
    title: "Annual Cultural Day Celebrated in Grand Style",
    category: "Events",
    date: "2026-09-15",
    dateDisplay: "Sep 2026",
    image: "/assets/class-students.png",
    excerpt: "Students showcased Nigeria's rich heritage through traditional dance, drama and cultural attire.",
    body: [
      "Our annual Cultural Day was a vibrant celebration of Nigeria's rich heritage, with students from every class participating in dance, drama, music and traditional attire displays.",
      "The event gave learners the opportunity to explore the diverse cultures of Nigeria, develop confidence in public performance and appreciate the values that unite us as a nation.",
      "Parents, guardians and community members joined us for the celebrations, making it a true community event that strengthened the bonds between the school and the families we serve.",
      "Cultural Day is one of the highlights of our school calendar and an important part of the character formation we pursue alongside academic excellence.",
    ],
  },
  {
    slug: "new-ict-lab-commissioned",
    title: "State-of-the-Art ICT Computer Lab Commissioned",
    category: "Announcements",
    date: "2026-08-20",
    dateDisplay: "Aug 2026",
    image: "/assets/classroom.png",
    excerpt: "Modern computer laboratory now fully accessible to all students for digital learning and coding skills.",
    body: [
      "We are pleased to announce the commissioning of our new ICT laboratory, equipped with modern computers and high-speed internet connectivity for all students.",
      "The new lab supports our commitment to technology-integrated learning, giving every learner hands-on experience with digital tools across all subjects.",
      "Students will use the facility for computer studies, research projects and guided digital literacy sessions led by our dedicated ICT team.",
      "This investment reflects our belief that technology, used thoughtfully, is an essential part of preparing young people for the world they will inherit.",
    ],
  },
  {
    slug: "outstanding-waec-results",
    title: "Outstanding 95% Pass Rate in WAEC & NECO Examinations",
    category: "Achievements",
    date: "2026-07-10",
    dateDisplay: "Jul 2026",
    image: "/assets/students-outdoors.jpg",
    excerpt: "95% of our SSS3 graduates achieved credit passes in five or more subjects including English and Mathematics.",
    body: [
      "We are proud to share that 95% of our SSS3 graduates achieved credit passes in five or more subjects, including English Language and Mathematics, in the most recent WAEC examinations.",
      "These results reflect the hard work of our students, the dedication of our teaching staff and the supportive learning environment we have built together with families.",
      "We congratulate every graduate and wish them success as they move on to tertiary education, vocational training or other next steps in their journey.",
      "Results like these reinforce our commitment to academic excellence and to preparing every learner for the opportunities and responsibilities ahead.",
    ],
  },
  {
    slug: "inter-house-sports",
    title: "Inter-House Sports Competition Champions Crowned",
    category: "Events",
    date: "2026-06-18",
    dateDisplay: "Jun 2026",
    image: "/assets/sports.png",
    excerpt: "Four houses competed in athletics, football and relay races in a display of teamwork and sportsmanship.",
    body: [
      "Our annual Inter-House Sports Competition brought together all four houses for a day of athletics, football and relay races, showcasing teamwork, fitness and sportsmanship.",
      "Students competed with enthusiasm and respect for their opponents, demonstrating the values of discipline and fair play that we emphasise across school life.",
      "The event was supported by staff, parents and community members who came to cheer on the competitors and celebrate the spirit of healthy competition.",
      "Sports remain an important part of the Teacher Home experience, helping students build confidence, resilience and a lifelong appreciation for physical wellbeing.",
    ],
  },
];

export function SchoolLanding() {
  const [activeTab, setActiveTab] = React.useState<string>("home");
  const [newsFilter, setNewsFilter] = React.useState<string>("All");
  const [selectedArticle, setSelectedArticle] = React.useState<NewsPost | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  // Sync with window.location.hash on mount and changes
  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (
        [
          "home",
          "about",
          "academics",
          "admissions",
          "management",
          "facilities",
          "bulletin",
          "portal",
          "contact",
        ].includes(hash)
      ) {
        setActiveTab(hash);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const switchTab = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const testimonials = [
    {
      quote:
        "Teacher Home has helped our daughter become more focused, confident and eager to learn. We value the prompt communication and genuine care from every teacher.",
      name: "Mrs. A. Okene",
      role: "Parent, JSS2",
    },
    {
      quote:
        "The balance of strict discipline, strong academics and modern ICT technology is exactly what we wanted. Our son feels known, valued and supported.",
      name: "Mr. J. Musa",
      role: "Parent, SSS1",
    },
  ];

  const faqs = [
    {
      q: "Which classes are currently accepting applications?",
      a: "Applications are currently open for JSS1 through SSS2, subject to available seats and the outcome of the entrance assessment.",
    },
    {
      q: "Does my child need to sit for an entrance assessment?",
      a: "Yes. The diagnostic assessment helps our teachers understand each student's current baseline in literacy, numeracy, and general reasoning so we can properly support them.",
    },
    {
      q: "Can we visit the school premises before applying?",
      a: "Absolutely! We encourage parents to visit our campus in Peace Community, Lokoja, Monday through Friday between 8:00 AM and 2:00 PM for a guided tour.",
    },
    {
      q: "Is school bus transport available within Lokoja?",
      a: "Yes, safe school bus shuttle services cover major routes across Lokoja. Our admissions desk can provide exact pick-up and drop-off points.",
    },
    {
      q: "How will I know if my child has been offered admission?",
      a: "Successful families receive an official letter of offer via email and SMS within 5 working days following the entrance examination.",
    },
  ];

  const filteredPosts =
    newsFilter === "All"
      ? BULLETIN_POSTS
      : BULLETIN_POSTS.filter((p) => p.category === newsFilter);

  return (
    <div className="w-full">
      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-[#0a1320] border border-[#003366]/20 p-6 md:p-8 shadow-2xl space-y-6 my-8">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#003366]/10 px-3 py-1 text-xs font-bold text-[#003366] dark:text-[#66b2ff]">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  • {selectedArticle.dateDisplay}
                </span>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-[#003366] dark:text-white">
                {selectedArticle.title}
              </h2>
            </div>

            <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedArticle.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <Button
                variant="outline"
                onClick={() => setSelectedArticle(null)}
                className="rounded-xl text-xs font-bold"
              >
                Close Article
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Sub-Tab Bar for Quick Access */}
      <div className="sticky top-20 z-30 w-full border-b border-[#003366]/10 bg-white/90 dark:bg-[#0a1320]/90 backdrop-blur-md overflow-x-auto">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-xs">
          <div className="flex items-center gap-1.5 md:gap-2 overflow-x-auto py-1">
            {[
              { id: "home", label: "Overview" },
              { id: "about", label: "About Us" },
              { id: "academics", label: "Academics" },
              { id: "admissions", label: "Admissions" },
              { id: "facilities", label: "Facilities" },
              { id: "management", label: "Leadership" },
              { id: "bulletin", label: "School Bulletin" },
              { id: "portal", label: "School Portal" },
              { id: "contact", label: "Contact Us" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-[#003366] text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-[#e9f5ff] dark:hover:bg-slate-800 hover:text-[#003366]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#990033] text-white text-[11px] font-bold shadow-sm hover:opacity-90 transition"
            >
              <GraduationCap className="h-3 w-3" />
              <span>Student Result Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: HOME (OVERVIEW)
         ========================================================================= */}
      {activeTab === "home" && (
        <div className="space-y-20">
          {/* Hero Section */}
          <section className="relative min-h-[calc(100vh-140px)] flex items-center overflow-hidden bg-gradient-to-br from-[#001a3d] via-[#003366] to-[#004a99] text-white">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
              style={{ backgroundImage: "url('/assets/school-hero.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#001834]/95 via-[#003366]/85 to-transparent z-10" />

            <div className="container mx-auto px-6 md:px-12 py-16 relative z-20 max-w-5xl">
              <div className="space-y-6 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#66b2ff]">
                  <span className="h-0.5 w-8 bg-[#66b2ff]" />
                  <span>Peace Community, Lokoja</span>
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
                  Teacher Home
                  <span className="block text-2xl sm:text-3xl md:text-4xl text-[#66b2ff] font-sans font-bold mt-2">
                    Secondary School
                  </span>
                </h1>

                <p className="font-heading text-xl md:text-2xl font-bold text-[#ffccd5]">
                  Educate A Child &amp; Build A Virile Nation
                </p>

                <p className="text-sm md:text-base text-white/85 max-w-xl font-normal leading-relaxed">
                  A warm, disciplined and technology-forward learning community preparing every child from JSS1 to SSS3 for academic distinction and life beyond the classroom.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="https://forms.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#990033] to-[#7a0029] text-white font-bold text-xs md:text-sm shadow-xl shadow-[#990033]/30 hover:shadow-2xl hover:scale-[1.02] transition-all"
                  >
                    <span>Apply for Admission</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <button
                    onClick={() => switchTab("about")}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/40 bg-white/10 backdrop-blur-md text-white font-bold text-xs md:text-sm hover:bg-white hover:text-[#003366] transition-all"
                  >
                    Explore Our School
                  </button>

                  <button
                    onClick={() => switchTab("portal")}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#66b2ff]/40 bg-[#001f3f]/80 text-[#66b2ff] font-bold text-xs md:text-sm hover:bg-[#66b2ff] hover:text-[#001f3f] transition-all"
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span>Check Student Results</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom 4 Hero Stats Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-[#66b2ff]/20 bg-[#001f3f]/90 backdrop-blur-md">
              <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10 py-5 px-6">
                <div className="text-center py-2">
                  <p className="font-heading text-2xl md:text-3xl font-bold text-white">180-200</p>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#66b2ff]">Active Learners</p>
                </div>
                <div className="text-center py-2">
                  <p className="font-heading text-2xl md:text-3xl font-bold text-white">JSS1 – SSS3</p>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#66b2ff]">Class Levels</p>
                </div>
                <div className="text-center py-2">
                  <p className="font-heading text-2xl md:text-3xl font-bold text-white">WAEC &amp; NECO</p>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#66b2ff]">Curriculum Standard</p>
                </div>
                <div className="text-center py-2">
                  <p className="font-heading text-2xl md:text-3xl font-bold text-white">ICT-First</p>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#66b2ff]">Integrated Technology</p>
                </div>
              </div>
            </div>
          </section>

          {/* Welcome Message Section */}
          <section className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#003366]/10 aspect-[4/3] bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/classroom.png"
                  alt="Teacher Home Classroom Learning"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#003366] dark:text-[#66b2ff]">
                    Welcome to Teacher Home
                  </span>
                  <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#003366] dark:text-white leading-tight">
                    Strong foundations. Wider possibilities.
                  </h2>
                </div>

                <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  We combine rigorous teaching, purposeful technology and genuine pastoral care so every learner in Lokoja can grow in knowledge, confidence and character. Our educators treat each student as an individual with unique potential.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {[
                    "Small class attention & mentoring",
                    "Qualified, caring and certified teachers",
                    "Values-led discipline & moral uprightness",
                    "Practical ICT and digital literacy skills",
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                      <div className="h-6 w-6 rounded-full bg-[#e9f5ff] dark:bg-slate-800 text-[#003366] dark:text-[#66b2ff] flex items-center justify-center shrink-0">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    onClick={() => switchTab("about")}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#003366] text-white px-5 py-3 text-xs font-bold shadow-md hover:bg-[#002a54] transition"
                  >
                    <span>Discover Our Story</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Teacher Home (5 Pillars Grid) */}
          <section className="bg-[#f4f9fe] dark:bg-[#08101a] py-16 border-y border-[#003366]/10">
            <div className="container mx-auto px-6 md:px-12 space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#003366] dark:text-[#66b2ff]">
                  Why Teacher Home
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[#003366] dark:text-white">
                  The advantage your child deserves
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground">
                  A complete, balanced learning experience designed for ambitious families in Lokoja.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  {
                    icon: GraduationCap,
                    title: "Standard Education",
                    desc: "Rigorous curriculum aligned to national and regional benchmarks.",
                  },
                  {
                    icon: Users,
                    title: "Dedicated Staff",
                    desc: "Passionate teachers committed to academic and character progress.",
                  },
                  {
                    icon: Laptop,
                    title: "ICT-Integrated",
                    desc: "Hands-on computer training in our dedicated modern laboratory.",
                  },
                  {
                    icon: Trophy,
                    title: "Beyond Classrooms",
                    desc: "Sports, debate clubs, and cultural leadership activities.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Health & Safety",
                    desc: "Secure, walled compound with caring pastoral supervision.",
                  },
                ].map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="rounded-2xl border border-[#003366]/10 bg-white dark:bg-[#0a1320] p-6 text-center space-y-3.5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                    >
                      <div className="h-12 w-12 rounded-xl bg-[#e9f5ff] dark:bg-slate-800 text-[#003366] dark:text-[#66b2ff] mx-auto flex items-center justify-center">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-heading text-sm font-bold text-[#003366] dark:text-white">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* School Facilities Preview */}
          <section className="container mx-auto px-6 md:px-12 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#003366] dark:text-[#66b2ff]">
                  Campus &amp; Facilities
                </span>
                <h2 className="font-heading text-3xl font-extrabold text-[#003366] dark:text-white">
                  Spaces designed for active learning
                </h2>
              </div>
              <button
                onClick={() => switchTab("facilities")}
                className="text-xs font-bold text-[#003366] dark:text-[#66b2ff] hover:underline flex items-center gap-1"
              >
                <span>View all facilities</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Modern Science Labs",
                  desc: "Hands-on physics, chemistry and biology experimentation.",
                  img: "/assets/science-lab.jpg",
                },
                {
                  title: "ICT Computer Suite",
                  desc: "Individual computer workstations with curated digital learning software.",
                  img: "/assets/classroom.png",
                },
                {
                  title: "Sports & Athletics",
                  desc: "Spacious sports grounds for football, athletics, and physical education.",
                  img: "/assets/sports.png",
                },
                {
                  title: "Airy Classrooms",
                  desc: "Ergonomic furniture and focused learning environments for every grade.",
                  img: "/assets/class-students.png",
                },
              ].map((fac) => (
                <div
                  key={fac.title}
                  className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={fac.img}
                      alt={fac.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-1.5">
                    <h3 className="font-heading text-sm font-bold text-foreground">
                      {fac.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {fac.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* School Bulletin & News Preview */}
          <section className="bg-[#f8faff] dark:bg-[#070e17] py-16 border-y border-[#003366]/10">
            <div className="container mx-auto px-6 md:px-12 space-y-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#003366] dark:text-[#66b2ff]">
                    School Bulletin
                  </span>
                  <h2 className="font-heading text-3xl font-extrabold text-[#003366] dark:text-white">
                    What is happening at Teacher Home
                  </h2>
                </div>
                <button
                  onClick={() => switchTab("bulletin")}
                  className="text-xs font-bold text-[#003366] dark:text-[#66b2ff] hover:underline flex items-center gap-1"
                >
                  <span>Read all updates ({BULLETIN_POSTS.length})</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BULLETIN_POSTS.slice(0, 3).map((post) => (
                  <article
                    key={post.slug}
                    onClick={() => setSelectedArticle(post)}
                    className="cursor-pointer group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-[#003366]/90 text-white text-[10px] font-bold px-2.5 py-1 backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5 space-y-2.5">
                      <span className="text-[11px] text-muted-foreground font-semibold">
                        {post.dateDisplay}
                      </span>
                      <h3 className="font-heading text-base font-bold text-foreground group-hover:text-[#990033] transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#003366] dark:text-[#66b2ff] pt-1">
                        <span>Read story</span>
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonial Quote Banner */}
          <section className="bg-gradient-to-r from-[#001f3f] to-[#003366] text-white py-16">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center space-y-6">
              <span className="text-4xl text-[#66b2ff] font-serif">“</span>
              <p className="font-heading text-xl md:text-2xl font-medium leading-relaxed italic text-white/95">
                {testimonials[currentTestimonial].quote}
              </p>
              <div>
                <p className="font-bold text-base text-white">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-xs text-[#66b2ff]">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() =>
                    setCurrentTestimonial((prev) => (prev === 0 ? 1 : 0))
                  }
                  className="h-9 w-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#003366] transition"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    setCurrentTestimonial((prev) => (prev === 1 ? 0 : 1))
                  }
                  className="h-9 w-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#003366] transition"
                  aria-label="Next"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Admissions CTA Band */}
          <section className="container mx-auto px-6 md:px-12">
            <div className="rounded-3xl bg-gradient-to-r from-[#990033] via-[#85002c] to-[#003366] text-white p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-[#ffccd5]">
                  Admissions 2026/2027
                </span>
                <h2 className="font-heading text-2xl md:text-4xl font-extrabold">
                  Give your child room to thrive.
                </h2>
                <p className="text-xs md:text-sm text-white/85 max-w-lg">
                  Join a community of ambitious learners in Lokoja. Enrolment is currently open for JSS1 through SSS2.
                </p>
              </div>

              <div className="flex flex-wrap gap-3.5 justify-center">
                <button
                  onClick={() => switchTab("contact")}
                  className="rounded-xl bg-white text-[#990033] font-bold text-xs md:text-sm px-6 py-3.5 shadow-md hover:bg-slate-100 transition"
                >
                  Schedule a Visit
                </button>
                <a
                  href="https://forms.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white bg-black/20 text-white font-bold text-xs md:text-sm px-6 py-3.5 hover:bg-white/10 transition flex items-center gap-1.5"
                >
                  <span>Apply Online</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* =========================================================================
          TAB 2: ABOUT US
         ========================================================================= */}
      {activeTab === "about" && (
        <div className="container mx-auto px-6 md:px-12 py-12 space-y-16 animate-in fade-in">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#003366] dark:text-[#66b2ff]">
              About Teacher Home
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-[#003366] dark:text-white">
              A school built around every learner
            </h1>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              Rooted in Peace Community, Lokoja and focused on the future, we help young people build knowledge, character, and courage from JSS1 to SSS3.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <h2 className="font-heading text-2xl font-bold text-[#003366] dark:text-white">
                Our Story &amp; Purpose
              </h2>
              <p>
                Teacher Home Secondary School was established to give families in Kogi State a trusted environment where rigorous academics and sound moral values grow side-by-side. From the first day of JSS1 to graduation at SSS3, students receive structured instruction, individual attention, and encouragement.
              </p>
              <p>
                Today, our school community serves approximately 180 to 200 learners through the Nigerian Educational Curriculum, enriched with practical technology, co-curricular sports, and intentional character formation.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/classroom.png"
                alt="Teacher Home School Facilities"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Mission, Vision, and Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-[#003366]/20 bg-white dark:bg-[#0a1320] p-6 space-y-3 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#990033]">Our Mission</span>
              <h3 className="font-heading text-lg font-bold text-[#003366] dark:text-white">To Nurture &amp; Equip</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                To provide quality, technology-integrated secondary education that nurtures intellectual curiosity, moral integrity, and practical skills in every child.
              </p>
            </div>

            <div className="rounded-2xl border border-[#003366]/20 bg-white dark:bg-[#0a1320] p-6 space-y-3 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#003366] dark:text-[#66b2ff]">Our Vision</span>
              <h3 className="font-heading text-lg font-bold text-[#003366] dark:text-white">Virile Nation Builders</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                To be Kogi State’s most trusted secondary institution, raising disciplined leaders who excel academically and contribute strength to our nation.
              </p>
            </div>

            <div className="rounded-2xl border border-[#003366]/20 bg-white dark:bg-[#0a1320] p-6 space-y-3 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#990033]">Core Values</span>
              <h3 className="font-heading text-lg font-bold text-[#003366] dark:text-white">Character &amp; Discipline</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Excellence, Integrity, Discipline, Innovation, Respect, and Service to Community guide every classroom and interaction.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: ACADEMICS
         ========================================================================= */}
      {activeTab === "academics" && (
        <div className="container mx-auto px-6 md:px-12 py-12 space-y-16 animate-in fade-in">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#003366] dark:text-[#66b2ff]">
              Academic Programme
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-[#003366] dark:text-white">
              Learning that builds momentum
            </h1>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              A clear academic progression from junior secondary foundations to confident senior secondary specialisation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-[#003366]/20 bg-white dark:bg-[#0a1320] p-8 space-y-4 shadow-sm">
              <span className="text-xs font-mono font-bold uppercase text-[#003366] dark:text-[#66b2ff]">Years 7 – 9</span>
              <h2 className="font-heading text-2xl font-extrabold text-[#003366] dark:text-white">
                Junior Secondary School
              </h2>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                JSS1 to JSS3 establish strong literacy, numeracy, scientific inquiry, digital literacy, and broad subject foundations before specialized tracks.
              </p>
              <div className="flex gap-2 pt-2">
                {["JSS 1", "JSS 2", "JSS 3"].map((tag) => (
                  <span key={tag} className="rounded-md bg-[#e9f5ff] dark:bg-slate-800 text-[#003366] dark:text-[#66b2ff] px-3 py-1 text-xs font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#990033]/20 bg-white dark:bg-[#0a1320] p-8 space-y-4 shadow-sm">
              <span className="text-xs font-mono font-bold uppercase text-[#990033]">Years 10 – 12</span>
              <h2 className="font-heading text-2xl font-extrabold text-[#990033] dark:text-[#ff6685]">
                Senior Secondary School
              </h2>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                SSS1 to SSS3 deepen academic rigor across Science, Arts, and Commercial tracks, preparing learners for WAEC, NECO, UTME, and higher education.
              </p>
              <div className="flex gap-2 pt-2">
                {["SSS 1", "SSS 2", "SSS 3"].map((tag) => (
                  <span key={tag} className="rounded-md bg-[#fff0f3] dark:bg-slate-800 text-[#990033] dark:text-[#ff6685] px-3 py-1 text-xs font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Three Subject Tracks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
              <span className="text-2xl font-heading font-bold text-[#003366] dark:text-[#66b2ff]">01</span>
              <h3 className="font-heading text-lg font-bold text-foreground">Core Foundation</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                English Language, General Mathematics, Civic Education, Computer Studies, and Basic Science form the bedrock for every student.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
              <span className="text-2xl font-heading font-bold text-[#990033]">02</span>
              <h3 className="font-heading text-lg font-bold text-foreground">Science &amp; STEM Track</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Physics, Chemistry, Biology, Further Mathematics, Technical Drawing, and Computer Science with hands-on laboratory experiments.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
              <span className="text-2xl font-heading font-bold text-[#003366] dark:text-[#66b2ff]">03</span>
              <h3 className="font-heading text-lg font-bold text-foreground">Arts &amp; Commercial Track</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Government, Literature in English, Economics, Financial Accounting, Commerce, and Christian Religious Studies.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: ADMISSIONS
         ========================================================================= */}
      {activeTab === "admissions" && (
        <div className="container mx-auto px-6 md:px-12 py-12 space-y-16 animate-in fade-in">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#003366] dark:text-[#66b2ff]">
              Admissions 2026/2027
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-[#003366] dark:text-white">
              Take the first step today
            </h1>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              Applications are welcome for JSS1 through SSS2, subject to available seats. Our admissions team is ready to guide your family.
            </p>
            <div className="pt-2">
              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#990033] text-white px-6 py-3.5 text-xs md:text-sm font-bold shadow-lg hover:opacity-95 transition"
              >
                <span>Start Online Application</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* 4 Steps */}
          <div className="space-y-8">
            <h2 className="font-heading text-2xl font-bold text-[#003366] dark:text-white">
              A Simple Four-Step Admission Process
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "Step 1",
                  title: "Submit Application",
                  desc: "Complete the online application form with parent and candidate records.",
                },
                {
                  step: "Step 2",
                  title: "Submit Documents",
                  desc: "Bring past report cards and birth certificate to the admissions office.",
                },
                {
                  step: "Step 3",
                  title: "Entrance Assessment",
                  desc: "Your child completes an age-appropriate assessment in English & Maths.",
                },
                {
                  step: "Step 4",
                  title: "Offer & Resumption",
                  desc: "Receive the formal letter of offer, resumption pack, and uniform details.",
                },
              ].map((s) => (
                <div key={s.step} className="rounded-2xl border border-border bg-card p-6 space-y-3">
                  <span className="text-xs font-bold uppercase text-[#990033]">{s.step}</span>
                  <h3 className="font-heading text-base font-bold text-foreground">{s.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="space-y-6 max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-[#003366] dark:text-white">
              Frequently Asked Questions by Parents
            </h2>
            <div className="divide-y divide-border border border-border rounded-2xl bg-card overflow-hidden">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.q} className="p-4 md:p-5">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left font-bold text-xs md:text-sm text-foreground gap-4"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform ${
                          isOpen ? "rotate-180 text-[#003366]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="text-xs md:text-sm text-muted-foreground mt-2.5 leading-relaxed animate-in fade-in">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: SCHOOL PORTAL (DEDICATED PORTAL HUB AS REQUESTED)
         ========================================================================= */}
      {activeTab === "portal" && (
        <div className="container mx-auto px-6 md:px-12 py-12 space-y-16 animate-in fade-in">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#003366] dark:text-[#66b2ff]">
              Secure School Portals
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-[#003366] dark:text-white">
              Results, records, and administration online
            </h1>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              Authorised students, parents, and academic staff can access academic records, report cards, class rosters, and grade management securely.
            </p>
          </div>

          {/* Dual Portal Gateway Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1. Student Portal Card */}
            <div className="rounded-3xl border-2 border-[#990033]/30 bg-white dark:bg-[#0a1320] p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-[#990033] to-[#7a0029] absolute top-0 left-0 right-0" />
              <div className="h-14 w-14 rounded-2xl bg-[#fff0f3] dark:bg-slate-800 text-[#990033] flex items-center justify-center">
                <GraduationCap className="h-7 w-7" />
              </div>

              <div className="space-y-2">
                <h2 className="font-heading text-2xl font-extrabold text-[#003366] dark:text-white">
                  Student &amp; Parent Portal
                </h2>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Check termly examination results, download official report sheets, review class attendance, and access lesson modules.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#990033]" />
                  <span>Instant term examination result checker</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#990033]" />
                  <span>Digital report card download &amp; printing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#990033]" />
                  <span>Student timetable &amp; interactive quizzes</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/dashboard"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#990033] to-[#7a0029] text-white px-5 py-3 text-xs font-bold shadow-md hover:opacity-95 transition"
                >
                  <span>Open Student Portal</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>

                <a
                  href="https://school-website-one-umber.vercel.app/student-login"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-3 text-xs font-bold text-muted-foreground hover:text-foreground transition"
                >
                  <span>External Result Check</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* 2. Staff Portal Card */}
            <div className="rounded-3xl border-2 border-[#003366]/30 bg-white dark:bg-[#0a1320] p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-[#003366] to-[#004a99] absolute top-0 left-0 right-0" />
              <div className="h-14 w-14 rounded-2xl bg-[#e9f5ff] dark:bg-slate-800 text-[#003366] dark:text-[#66b2ff] flex items-center justify-center">
                <Shield className="h-7 w-7" />
              </div>

              <div className="space-y-2">
                <h2 className="font-heading text-2xl font-extrabold text-[#003366] dark:text-white">
                  Staff &amp; Admin Console
                </h2>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Manage student profiles, enter continuous assessment scores, publish bulletin announcements, and configure school parameters.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#003366] dark:text-[#66b2ff]" />
                  <span>Student record and enrollment registry</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#003366] dark:text-[#66b2ff]" />
                  <span>Grade collation and score computation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#003366] dark:text-[#66b2ff]" />
                  <span>Security audit logs and role administration</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/admin"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#003366] to-[#002a54] text-white px-5 py-3 text-xs font-bold shadow-md hover:bg-[#002244] transition"
                >
                  <span>Open Staff Portal</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>

                <a
                  href="https://school-website-one-umber.vercel.app/admin-login"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-3 text-xs font-bold text-muted-foreground hover:text-foreground transition"
                >
                  <span>External Admin Gateway</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Credentials Guide */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4">
            <h3 className="font-heading text-lg font-bold text-foreground">
              Portal Access Credentials Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-muted-foreground leading-relaxed">
              <div>
                <p className="font-bold text-foreground mb-1">Student ID / Reg Number:</p>
                <p>Use the unique student registration number on your school ID card or admission letter (e.g., THS/2026/042).</p>
              </div>
              <div>
                <p className="font-bold text-foreground mb-1">PIN / Password:</p>
                <p>Enter the confidential scratch PIN or account password issued by the school administrative office.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: FACILITIES
         ========================================================================= */}
      {activeTab === "facilities" && (
        <div className="container mx-auto px-6 md:px-12 py-12 space-y-16 animate-in fade-in">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#003366] dark:text-[#66b2ff]">
              Campus Facilities
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-[#003366] dark:text-white">
              Spaces designed for active learning
            </h1>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              Explore our laboratories, ICT suites, sporting facilities, and interactive learning spaces in Peace Community, Lokoja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Science Laboratories",
                desc: "Fully equipped Physics, Chemistry, and Biology laboratories enabling learners to verify theoretical concepts with safe, guided practicals.",
                img: "/assets/science-lab.jpg",
              },
              {
                title: "ICT & Digital Learning Hub",
                desc: "Modern computer laboratory with reliable broadband access, coding tools, and interactive digital literacy instruction.",
                img: "/assets/classroom.png",
              },
              {
                title: "Sports & Physical Education Grounds",
                desc: "Active sports grounds supporting football, track athletics, volleyball, table tennis, and teamwork development.",
                img: "/assets/sports.png",
              },
              {
                title: "Disciplined Classroom Environments",
                desc: "Comfortable seating, whiteboard facilities, and low student-to-teacher ratios ensure focused individual attention.",
                img: "/assets/class-students.png",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-border bg-card overflow-hidden shadow-md space-y-4 p-5">
                <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.img} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 7: LEADERSHIP & MANAGEMENT
         ========================================================================= */}
      {activeTab === "management" && (
        <div className="container mx-auto px-6 md:px-12 py-12 space-y-16 animate-in fade-in">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#003366] dark:text-[#66b2ff]">
              Leadership &amp; Faculty
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-[#003366] dark:text-white">
              Leadership with purpose
            </h1>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              Experienced educational administrators united by one mission: helping every student do their best work and become their best self.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Mr. James Okene",
                role: "Proprietor & Founder",
                bio: "Visionary education leader with over 20 years of experience in educational administration and community development in Kogi State.",
              },
              {
                name: "Mrs. Aisha Musa",
                role: "Principal",
                bio: "Dedicated administrator committed to academic excellence, disciplined character formation, and student pastoral wellbeing.",
              },
              {
                name: "Mr. Daniel Ibrahim",
                role: "Vice Principal (Academics)",
                bio: "Experienced curriculum coordinator ensuring syllabus completion, quality assessments, and continuous examination preparation.",
              },
              {
                name: "Mrs. Grace Ojo",
                role: "Vice Principal (Administration)",
                bio: "Organised administrator overseeing staff welfare, daily school operations, and parent communication with warmth.",
              },
              {
                name: "Mr. Samuel Adeyemi",
                role: "Head of ICT",
                bio: "Technology enthusiast driving digital literacy, computer studies, and classroom technology integration across all grades.",
              },
              {
                name: "Mrs. Blessing Eze",
                role: "Guidance & Counselling",
                bio: "Caring counsellor providing age-appropriate academic guidance, emotional mentorship, and career pathway advice.",
              },
            ].map((leader) => (
              <div key={leader.name} className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-[#003366] text-white flex items-center justify-center font-heading font-bold text-lg">
                  {leader.name.split(" ")[1]?.charAt(0) || "T"}
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#990033]">
                    {leader.role}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {leader.name}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 8: SCHOOL BULLETIN
         ========================================================================= */}
      {activeTab === "bulletin" && (
        <div className="container mx-auto px-6 md:px-12 py-12 space-y-12 animate-in fade-in">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#003366] dark:text-[#66b2ff]">
              Official Notices &amp; News
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-[#003366] dark:text-white">
              School Bulletin
            </h1>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              Stay up to date with admissions announcements, student achievements, termly events, and campus updates.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {["All", "Admissions", "Achievements", "Events", "Announcements"].map((cat) => (
              <button
                key={cat}
                onClick={() => setNewsFilter(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  newsFilter === cat
                    ? "bg-[#003366] text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* All Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                onClick={() => setSelectedArticle(post)}
                className="cursor-pointer group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-[#003366]/90 text-white text-[10px] font-bold px-2.5 py-1 backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 space-y-2.5">
                  <span className="text-[11px] text-muted-foreground font-semibold">
                    {post.dateDisplay}
                  </span>
                  <h3 className="font-heading text-base font-bold text-foreground group-hover:text-[#990033] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#003366] dark:text-[#66b2ff] pt-1">
                    <span>Read full article</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 9: CONTACT US
         ========================================================================= */}
      {activeTab === "contact" && (
        <div className="container mx-auto px-6 md:px-12 py-12 space-y-16 animate-in fade-in">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#003366] dark:text-[#66b2ff]">
              Get In Touch
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-[#003366] dark:text-white">
              We would love to meet your family
            </h1>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              Ask a question, schedule an on-campus tour, or enquire about 2026/2027 admissions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
                <h2 className="font-heading text-lg font-bold text-foreground">
                  Campus Address &amp; Office Hours
                </h2>
                <div className="space-y-3.5 text-xs md:text-sm text-slate-700 dark:text-slate-300">
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
            </div>

            {/* Direct Email Generator Form */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4">
              <h2 className="font-heading text-lg font-bold text-foreground">
                Send an Enquiry
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const data = new FormData(form);
                  const name = data.get("name") as string;
                  const email = data.get("email") as string;
                  const phone = data.get("phone") as string;
                  const msg = data.get("message") as string;
                  window.location.href = `mailto:info@teacherhomeschool.com?subject=${encodeURIComponent(
                    `Website Enquiry from ${name}`
                  )}&body=${encodeURIComponent(
                    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${msg}`
                  )}`;
                }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Your Name</label>
                  <input
                    name="name"
                    required
                    placeholder="e.g., Mr. David Okoh"
                    className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="parent@example.com"
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Phone Number</label>
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
                    name="message"
                    required
                    rows={4}
                    placeholder="How can we assist you?"
                    className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-xl bg-[#003366] text-white hover:bg-[#002a54] font-bold text-xs"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
