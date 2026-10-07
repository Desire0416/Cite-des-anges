import "server-only";
import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import type { Session } from "./session";

/**
 * Comptes de l'espace de gestion, définis dans la variable ADMIN_ACCOUNTS
 * (en attendant la base de données) :
 *
 *   identifiant:Nom:role:sel:empreinte;identifiant2:Nom2:role2:sel2:empreinte2
 *
 * Les mots de passe ne sont jamais stockés en clair : seule leur empreinte
 * scrypt (sel et empreinte en base64url) figure dans la configuration.
 * Générer une entrée : `npm run admin:compte -- <identifiant> <Nom> [role]`.
 */

const scrypt = promisify(scryptCb) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;
const KEY_LENGTH = 32;
const ROLES = ["administrateur", "admissions"] as const;

type Account = {
  id: string;
  name: string;
  role: Session["role"];
  salt: Buffer;
  hash: Buffer;
};

function parseAccounts(raw: string | undefined): Account[] {
  if (!raw) return [];
  // Tolère les erreurs de collage courantes : guillemets autour de la valeur
  // ou nom de la variable recopié dans le champ « Value ».
  const value = raw
    .trim()
    .replace(/^ADMIN_ACCOUNTS\s*=\s*/, "")
    .replace(/^["']|["']$/g, "");
  return value
    .split(/[;\n]/)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .flatMap((entry) => {
      const [id, name, role, salt, hash] = entry.split(":").map((part) => part?.trim());
      if (!id || !name || !salt || !hash || !(ROLES as readonly string[]).includes(role)) return [];
      return [
        {
          id: id.toLowerCase(),
          name,
          role: role as Session["role"],
          salt: Buffer.from(salt, "base64url"),
          hash: Buffer.from(hash, "base64url"),
        },
      ];
    });
}

export function accountsConfigured() {
  return parseAccounts(process.env.ADMIN_ACCOUNTS).length > 0;
}

/** État de la configuration, sans jamais exposer de valeur. */
export function accountsStatus(): "absente" | "illisible" | "ok" {
  if (!process.env.ADMIN_ACCOUNTS?.trim()) return "absente";
  return accountsConfigured() ? "ok" : "illisible";
}

/** Empreinte factice : le temps de réponse ne révèle pas si l'identifiant existe. */
const decoy = { salt: randomBytes(16), hash: randomBytes(KEY_LENGTH) };

export async function authenticate(identifier: string, password: string) {
  const account = parseAccounts(process.env.ADMIN_ACCOUNTS).find((a) => a.id === identifier.trim().toLowerCase());
  const target = account ?? decoy;
  const candidate = await scrypt(password, target.salt, KEY_LENGTH);
  const valid = candidate.length === target.hash.length && timingSafeEqual(candidate, target.hash);
  return account && valid ? { name: account.name, role: account.role } : null;
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, KEY_LENGTH);
  return `${salt.toString("base64url")}:${hash.toString("base64url")}`;
}
