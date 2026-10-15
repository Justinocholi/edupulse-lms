import { Users, Shield, GraduationCap, UserCheck, ShieldAlert } from "lucide-react";
import { dataStore } from "@/lib/db/data-store";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types";
import { updateUserRoleAction } from "./actions";

export const metadata = {
  title: "User Management | EduPulse Admin",
  description: "Manage registered student accounts, instructor credentials, and administrative roles.",
};

export default async function AdminUsersPage() {
  const users = await dataStore.getUsers();

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="space-y-2">
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
          User & Identity Management
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Audit registered user profiles, monitor enrollment counts, and enforce server-delegated role authorization.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border/80 text-muted-foreground font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Enrollments</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4 text-right">Role Delegation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {users.map((user) => {
                const roleBadge = {
                  admin: "brand",
                  instructor: "secondary",
                  student: "outline",
                }[user.role] as "brand" | "secondary" | "outline";

                const formattedDate = new Date(user.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <tr key={user.id} className="hover:bg-muted/30 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={user.avatar_url}
                          fallback={user.full_name}
                          size="sm"
                        />
                        <div>
                          <p className="font-bold text-foreground text-sm">
                            {user.full_name}
                          </p>
                          <p className="text-muted-foreground text-[11px]">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <Badge variant={roleBadge} className="capitalize font-semibold text-[11px]">
                        {user.role}
                      </Badge>
                    </td>

                    <td className="p-4 font-semibold text-foreground">
                      {user.enrollments_count} active
                    </td>

                    <td className="p-4 text-muted-foreground">{formattedDate}</td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {user.role !== "admin" ? (
                          <form
                            action={async () => {
                              "use server";
                              await updateUserRoleAction(user.id, "admin");
                            }}
                          >
                            <Button
                              type="submit"
                              variant="outline"
                              size="sm"
                              className="h-8 rounded-lg text-xs"
                            >
                              <Shield className="mr-1 h-3.5 w-3.5 text-brand-500" />
                              Make Admin
                            </Button>
                          </form>
                        ) : (
                          <form
                            action={async () => {
                              "use server";
                              await updateUserRoleAction(user.id, "student");
                            }}
                          >
                            <Button
                              type="submit"
                              variant="ghost"
                              size="sm"
                              className="h-8 rounded-lg text-xs text-muted-foreground"
                            >
                              Demote to Student
                            </Button>
                          </form>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
