import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    ok: true,
    message: "Stripe webhook route scaffold is ready. Verify signatures and sync subscription state to Supabase here.",
  });
}
