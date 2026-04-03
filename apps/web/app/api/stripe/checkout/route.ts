import { NextResponse } from "next/server";
import { getStripeServerClient } from "@/lib/stripe";

export async function POST() {
  const stripe = getStripeServerClient();

  if (!stripe) {
    return NextResponse.json(
      {
        ok: false,
        message: "Stripe is not configured yet. Add STRIPE_SECRET_KEY to enable checkout.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Stripe checkout route scaffold is ready. Create a Checkout Session here with your selected price ID.",
  });
}
