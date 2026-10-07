import "server-only";
import { randomBytes } from "node:crypto";
import type { InquiryData } from "./inquiry";

/**
 * Stockage des demandes.
 *
 * En démonstration, rien n'est conservé : la demande est validée puis une
 * référence de simulation est renvoyée. La mise en service branchera ici la
 * base PostgreSQL (entité Inquiry) et la file de notifications.
 */

const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function makeReference(prefix: string) {
  const bytes = randomBytes(6);
  let code = "";
  for (const b of bytes) code += ALPHABET[b % ALPHABET.length];
  return `${prefix}-${code}`;
}

/** Idempotence : une même soumission renvoie toujours la même référence. */
const seen = new Map<string, { reference: string; at: number }>();
const IDEMPOTENCY_TTL = 1000 * 60 * 60 * 24;

export function rememberedReference(submissionId: string) {
  const entry = seen.get(submissionId);
  if (!entry) return undefined;
  if (Date.now() - entry.at > IDEMPOTENCY_TTL) {
    seen.delete(submissionId);
    return undefined;
  }
  return entry.reference;
}

export function rememberReference(submissionId: string, reference: string) {
  if (seen.size > 5000) {
    const oldest = seen.keys().next().value;
    if (oldest) seen.delete(oldest);
  }
  seen.set(submissionId, { reference, at: Date.now() });
}

/** Limitation de débit simple par adresse (fenêtre glissante). */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 8;

export function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 10000) hits.clear();
  return recent.length > MAX_HITS;
}

export class StorageUnavailableError extends Error {}

/** Enregistrement réel : à raccorder lors de la mise en service. */
export async function saveInquiry(data: InquiryData & { origine: string }): Promise<string> {
  void data;
  throw new StorageUnavailableError("Aucun stockage de production n’est configuré.");
}
