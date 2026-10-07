# Site du Groupe Scolaire La Cité des Anges

Site institutionnel et parcours de demande d’admission, réalisé d’après le cahier des charges v1.0 (6 octobre 2026).

- **Stack** : Next.js 16 (App Router), TypeScript, Tailwind CSS 4, icônes Lucide.
- **Polices** : Manrope (titres) et Source Sans 3 (texte), auto-hébergées par `next/font`.
- **Mode démonstration** activé par défaut : le formulaire est entièrement testable, mais aucune demande n’est transmise à l’école.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis compléter les valeurs
npm run dev                  # http://localhost:3000
```

Production :

```bash
npm run build
npm run start
```

## Pages

| Route | Rôle |
| --- | --- |
| `/` | Accueil : premier écran, repères, cycles, devise, accueil inclusif, étapes, FAQ, contact |
| `/ecole` | Identité, fiche de l’établissement, devise |
| `/maternelle`, `/primaire` | Pages de cycle, lien vers le formulaire avec le cycle présélectionné |
| `/accueil-inclusif` | Annonce factuelle, sujets d’échange, demande de rendez-vous |
| `/admissions` | Parcours, formulaire (`#demande`), FAQ complète |
| `/contact` | Coordonnées, repère graphique, formulaire commun |
| `/confidentialite`, `/mentions-legales` | Informations légales |
| `/vie-scolaire` | Masquée (404, hors menu et sitemap) tant qu’aucun contenu réel n’est publié |
| `/admin` | Aperçu privé du suivi des demandes, **données fictives** |

Le formulaire accepte des paramètres de présélection : `/admissions?cycle=maternelle&motif=rendez-vous#demande`.

## Mettre à jour le contenu

| Quoi | Où |
| --- | --- |
| Coordonnées, campagne, WhatsApp, itinéraire | `src/lib/site.ts` (ou variables d’environnement) |
| FAQ, devise, étapes d’admission | `src/lib/content.ts` |
| Règles du formulaire | `src/lib/inquiry.ts` (partagé navigateur / serveur) |
| Publications de vie scolaire | `src/lib/vie-scolaire.ts` + `NEXT_PUBLIC_FEATURE_VIE_SCOLAIRE=true` |
| Logo | `src/assets/logo.png` (version détourée du JPEG fourni) |

### Variables d’environnement

Voir `.env.example`. Points importants :

- `NEXT_PUBLIC_DEMO_MODE=false` désactive la simulation. **À ne faire qu’après raccordement du stockage** (voir plus bas) : sans base, le serveur répond honnêtement « indisponible » et le formulaire propose le téléphone et l’email.
- `NEXT_PUBLIC_CAMPAIGN_OPEN=false` ferme la campagne : le bandeau disparaît et les boutons deviennent « Me renseigner pour une prochaine rentrée ».
- `NEXT_PUBLIC_WHATSAPP_NUMBER` : le bouton WhatsApp n’apparaît que si ce numéro est renseigné (après confirmation de la direction).
- `NEXT_PUBLIC_DIRECTIONS_URL` : le bouton « Voir l’itinéraire » n’apparaît qu’après vérification du point exact.
- `NEXT_PUBLIC_SITE_INDEXABLE=true` autorise l’indexation (à activer uniquement sur le domaine définitif).
- `ADMIN_ACCOUNTS` et `SESSION_SECRET` (32 caractères minimum) activent l’espace `/admin`. Chaque compte s’écrit `identifiant:Nom:role:sel:empreinte` (séparés par `;`) ; les mots de passe ne sont jamais stockés en clair.

### Comptes de l’espace de gestion

Créer ou renouveler un compte :

```bash
npm run admin:compte -- direction Direction administrateur
```

Le script affiche l’entrée à placer dans `ADMIN_ACCOUNTS` et le mot de passe généré, à remettre à la personne concernée. Pour retirer un accès, supprimer son entrée puis redéployer. Ces comptes provisoires seront remplacés par des comptes en base lors de la mise en service.

## Formulaire et API

`POST /api/demandes` :

- n’accepte que les champs autorisés et refuse toute requête d’une autre origine ;
- revalide toutes les règles côté serveur (erreurs par champ, statut 422) ;
- limite le débit par adresse et intègre un champ piège anti-robot ;
- applique l’idempotence : un même `submissionId` renvoie toujours la même référence (double clic, reprise réseau) ;
- en démonstration, renvoie une référence `DEMO-XXXXXX` sans rien conserver.

## Avant la mise en service (lot P1)

Ces éléments ne sont pas inclus dans la démonstration et doivent être réalisés puis testés avant toute collecte réelle :

1. Base PostgreSQL et enregistrement durable : implémenter `saveInquiry()` dans `src/lib/inquiry-server.ts`.
2. File de notifications email avec réessai (adresse d’envoi authentifiée, Reply-To du parent si valide).
3. Comptes d’administration gérés en base (création et changement de mot de passe depuis l’interface), rôle Éditeur, authentification renforcée, actions de statut tracées en base, export CSV journalisé.
4. Limitation de débit et idempotence persistantes (les versions actuelles sont en mémoire).
5. Validation par la direction : textes, devise développée, notice de confidentialité, durée de conservation, numéro principal, WhatsApp, email destinataire, domaine.
6. Logo vectoriel officiel fourni par l’école, photographies approuvées avec autorisations de diffusion.
7. Recette complète (section 19 du cahier des charges), dont un envoi réel de test reçu et consulté par un utilisateur autorisé.
