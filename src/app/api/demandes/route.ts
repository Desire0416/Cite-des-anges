import { NextResponse } from "next/server";
import { ORIGINS, validateInquiry, type InquiryInput } from "@/lib/inquiry";
import {
  StorageUnavailableError,
  makeReference,
  rateLimited,
  rememberReference,
  rememberedReference,
  saveInquiry,
} from "@/lib/inquiry-server";
import { site } from "@/lib/site";

const ALLOWED_KEYS = new Set([
  "nom",
  "telephone",
  "email",
  "motif",
  "cycle",
  "annee",
  "message",
  "origine",
  "submissionId",
  "site_web",
]);

const MAX_BODY = 8 * 1024;
const UUID_RE = /^[0-9a-f-]{16,64}$/i;

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  // Requêtes du même site uniquement
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ ok: false, error: "origin" }, 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, error: "content-type" }, 415);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return json({ ok: false, error: "rate-limit" }, 429);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ ok: false, error: "too-large" }, 413);

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "invalid-json" }, 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json({ ok: false, error: "invalid-body" }, 400);
  }
  if (Object.keys(body).some((key) => !ALLOWED_KEYS.has(key))) {
    return json({ ok: false, error: "unexpected-field" }, 400);
  }

  const str = (key: string) => (typeof body[key] === "string" ? (body[key] as string) : "");
  const submissionId = str("submissionId");
  if (!UUID_RE.test(submissionId)) return json({ ok: false, error: "submission-id" }, 400);

  const previous = rememberedReference(submissionId);
  if (previous) return json({ ok: true, reference: previous, demo: site.demoMode });

  const input: InquiryInput = {
    nom: str("nom"),
    telephone: str("telephone"),
    email: str("email"),
    motif: str("motif"),
    cycle: str("cycle"),
    annee: str("annee"),
    message: str("message"),
  };
  const result = validateInquiry(input);
  if (!result.ok) return json({ ok: false, errors: result.errors }, 422);

  const origine = (ORIGINS as readonly string[]).includes(str("origine")) ? str("origine") : "/";

  // Champ piège rempli : réponse neutre, rien n'est enregistré
  if (str("site_web")) {
    return json({ ok: true, reference: makeReference(site.demoMode ? "DEMO" : "CDA"), demo: site.demoMode });
  }

  if (site.demoMode) {
    const reference = makeReference("DEMO");
    rememberReference(submissionId, reference);
    return json({ ok: true, reference, demo: true });
  }

  try {
    const reference = await saveInquiry({ ...result.data, origine });
    rememberReference(submissionId, reference);
    return json({ ok: true, reference, demo: false });
  } catch (error) {
    if (!(error instanceof StorageUnavailableError)) console.error("[demandes] échec d’enregistrement", error);
    return json({ ok: false, error: "unavailable" }, 503);
  }
}
