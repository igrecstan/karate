# Karate — Stack moderne (TypeScript + React + Vite)

Le projet a été migré vers une stack moderne sans exécution Python.

- **Frontend**: React + TypeScript + Vite (`/frontend`)
- **API**: Express + TypeScript (`/api`)
- **Base de données (phase 2)**: PostgreSQL via `DATABASE_URL` (fallback mémoire si absent)

## Démarrage rapide (local)

```bash
cp .env.example .env
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:5000`

## Mode persistant PostgreSQL (recommandé)

```bash
docker compose up -d db
# puis renseigner DATABASE_URL dans .env
# DATABASE_URL=postgresql://postgres:postgres@localhost:5432/karate
npm run dev
```

Au premier démarrage, l'API crée les tables et injecte des données initiales.

## Tester la page avec GitHub Pages

> GitHub Pages héberge seulement le frontend statique. L'API doit être déployée séparément (Railway/Render/Fly.io/etc.).

1. Pousse le code sur la branche `main`.
2. Dans GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Dans GitHub: **Settings → Secrets and variables → Actions → Variables**, crée:
   - `VITE_API_URL` = URL publique de ton API (ex: `https://karate-api.onrender.com`)
4. Le workflow `.github/workflows/deploy-pages.yml` build et déploie automatiquement `/frontend` sur Pages.
5. URL attendue: `https://<ton-user>.github.io/<ton-repo>/`

### Tester en local comme GitHub Pages

```bash
# simule le base path Pages
VITE_BASE_PATH=/karate/ npm run dev -w frontend
```

Puis ouvre:
`http://localhost:5173/#/`

## Comptes de test

- utilisateur: `admin`
- mot de passe: `admin123`

## Scripts

```bash
npm run dev
npm run build
npm run typecheck
```

## Notes migration

- Le code Python legacy a été retiré de la base de code active.
- L'API prend en charge clubs, messages, évènements et documents.
- La persistance DB est automatique si `DATABASE_URL` est défini.
