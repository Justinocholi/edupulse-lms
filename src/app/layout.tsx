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
  title: "EduPulse - Intelligent Enterprise Learning Management System",
  description:
    "Master enterprise web architecture, cloud-native Kubernetes, production AI engineering, and cybersecurity from industry authorities.",
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
