import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { getCurrentSession } from "@/lib/auth/session";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "EduPulse LMS | Modern, Distraction-Free Learning Platform",
  description:
    "Empower your technical career with structured masterclasses, live Zoom cohort batches, interactive assessments, community discussions, and verifiable certificates.",
  keywords: [
    "LMS",
    "Learning Management System",
    "Frappe LMS",
    "Software Engineering Courses",
    "Live Batches",
    "Interactive Quizzes",
    "Certificates",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar session={session} />
          <div className="flex-1">{children}</div>
          <Footer />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
