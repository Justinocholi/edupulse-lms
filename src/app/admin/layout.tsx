import { requireAdmin } from "@/lib/auth/session";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
    </div>
  );
}
