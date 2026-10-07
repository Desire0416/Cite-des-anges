import { NextResponse } from "next/server";
import { rateLimited } from "@/lib/inquiry-server";
import { SESSION_COOKIE, SESSION_MAX_AGE, adminConfigured, checkPassword, createSessionToken } from "@/lib/session";

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || new URL(origin).host === new URL(request.url).host;
}

/** Connexion à l'aperçu de gestion. */
export async function POST(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ ok: false }, { status: 403 });
  if (!adminConfigured()) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(`login:${ip}`)) return NextResponse.json({ ok: false, error: "rate-limit" }, { status: 429 });

  const body = (await request.json().catch(() => null)) as { password?: unknown } | null;
  const password = typeof body?.password === "string" ? body.password.slice(0, 200) : "";

  if (!(await checkPassword(password))) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, await createSessionToken({ name: "Compte de démonstration", role: "administrateur" }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}

/** Déconnexion. */
export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return NextResponse.json({ ok: false }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0, sameSite: "strict" });
  return response;
}
