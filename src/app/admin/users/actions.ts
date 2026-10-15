"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";
import { UserRole } from "@/types";

export async function updateUserRoleAction(targetUserId: string, newRole: UserRole) {
  const session = await requireAdmin();
  try {
    await dataStore.updateUserRole(session.user!.id, targetUserId, newRole);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update role" };
  }
}
