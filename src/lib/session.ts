/**
 * Session d'administration : jeton signé (HMAC-SHA256) stocké dans un cookie
 * HttpOnly. Utilisable depuis le proxy et les composants serveur.
 */

export const SESSION_COOKIE = "cda_admin";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 heures

export type Session = { name: string; role: "administrateur" | "admissions"; exp: number };

const encoder = new TextEncoder();

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  return secret && secret.length >= 32 ? secret : undefined;
}

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(base64);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

async function sign(data: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(data)));
}

/** Comparaison à durée constante. */
export function safeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export function sessionSecretConfigured() {
  return Boolean(getSecret());
}

export async function createSessionToken(session: Omit<Session, "exp">) {
  const secret = getSecret();
  if (!secret) throw new Error("SESSION_SECRET manquant ou trop court.");
  const payload: Session = { ...session, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE };
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
  return `${body}.${toBase64Url(await sign(body, secret))}`;
}

export async function verifySessionToken(token: string | undefined): Promise<Session | null> {
  const secret = getSecret();
  if (!token || !secret) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  try {
    const expected = await sign(body, secret);
    if (!safeEqual(expected, fromBase64Url(signature))) return null;
    const session = JSON.parse(new TextDecoder().decode(fromBase64Url(body))) as Session;
    if (typeof session.exp !== "number" || session.exp < Date.now() / 1000) return null;
    return session;
  } catch {
    return null;
  }
}
