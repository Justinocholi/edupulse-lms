import { requireAuth } from "@/lib/auth/session";
import { StudentSidebar } from "@/components/layout/student-sidebar";

export default async function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-background">
      <StudentSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
    </div>
  );
}
