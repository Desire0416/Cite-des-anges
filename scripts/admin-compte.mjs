// Crée une entrée pour la variable ADMIN_ACCOUNTS (espace de gestion).
//
//   npm run admin:compte -- <identifiant> <Nom> [administrateur|admissions]
//
// Un mot de passe aléatoire est généré (ou repris de la variable MOT_DE_PASSE).
// Seule l'empreinte scrypt est à placer dans ADMIN_ACCOUNTS ; le mot de passe
// est affiché une seule fois et doit être remis à la personne concernée.

import { randomBytes, scryptSync } from "node:crypto";

const [identifier, name, role = "administrateur"] = process.argv.slice(2);

if (!identifier || !name) {
  console.error("Usage : npm run admin:compte -- <identifiant> <Nom> [administrateur|admissions]");
  process.exit(1);
}
if (!/^[a-z0-9._-]{3,32}$/.test(identifier)) {
  console.error("Identifiant invalide : 3 à 32 caractères parmi a-z, 0-9, point, tiret, tiret bas.");
  process.exit(1);
}
if (/[:;\n]/.test(name)) {
  console.error("Le nom ne doit contenir ni « : » ni « ; ».");
  process.exit(1);
}
if (!["administrateur", "admissions"].includes(role)) {
  console.error("Rôle invalide : administrateur ou admissions.");
  process.exit(1);
}

const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const group = () => Array.from(randomBytes(4), (b) => ALPHABET[b % ALPHABET.length]).join("");
const password = process.env.MOT_DE_PASSE || `CDA-${group()}-${group()}-${group()}`;

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 32);
const entry = `${identifier}:${name}:${role}:${salt.toString("base64url")}:${hash.toString("base64url")}`;

console.log(`\nEntrée à ajouter dans ADMIN_ACCOUNTS (séparer plusieurs comptes par « ; ») :\n\n${entry}\n`);
console.log(`Identifiant : ${identifier}\nMot de passe : ${password}\n`);
