import { cookies } from "next/headers";
import type { AccessTier } from "@/lib/types";

export interface ViewerSession {
  isAuthenticated: boolean;
  accessTier: AccessTier;
  isAdmin: boolean;
  email?: string;
}

export async function getViewerSession(): Promise<ViewerSession> {
  const cookieStore = await cookies();
  const tierCookie = cookieStore.get("credwise_tier")?.value;
  const adminCookie = cookieStore.get("credwise_admin")?.value;

  const accessTier: AccessTier =
    tierCookie === "premium" || tierCookie === "plus" ? tierCookie : "free";

  return {
    isAuthenticated: accessTier !== "free",
    accessTier,
    isAdmin: adminCookie === "true",
    email: accessTier === "free" ? undefined : "subscriber@credwise.example",
  };
}

export function canAccessTier(viewerTier: AccessTier, requiredTier: AccessTier) {
  const rank: Record<AccessTier, number> = {
    free: 0,
    plus: 1,
    premium: 2,
  };

  return rank[viewerTier] >= rank[requiredTier];
}
