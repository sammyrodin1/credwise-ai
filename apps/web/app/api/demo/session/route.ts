import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tier = request.nextUrl.searchParams.get("tier");
  const admin = request.nextUrl.searchParams.get("admin");
  const redirectTo = request.nextUrl.searchParams.get("redirect") ?? "/";

  const response = NextResponse.redirect(new URL(redirectTo, request.url));

  if (!tier || tier === "free") {
    response.cookies.delete("credwise_tier");
  } else {
    response.cookies.set("credwise_tier", tier, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  }

  if (admin === "true") {
    response.cookies.set("credwise_admin", "true", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  } else {
    response.cookies.delete("credwise_admin");
  }

  return response;
}
