"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { dataStore } from "@/lib/db/data-store";
import { PlatformSettings } from "@/types";

export async function updatePlatformSettingsAction(settings: Partial<PlatformSettings>) {
  const session = await requireAdmin();
  try {
    const updated = await dataStore.updatePlatformSettings(settings, session.user!.id);
    await dataStore.createAuditLog({
      user_id: session.user!.id,
      action: "update_settings",
      entity_type: "platform_settings",
      entity_id: "general",
      metadata: { updated_keys: Object.keys(settings) },
    });
    revalidatePath("/admin/settings");
    return { success: true, settings: updated };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update platform settings" };
  }
}
