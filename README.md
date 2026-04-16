# Karate — Stack moderne (TypeScript + React + Vite)

Le projet a été migré vers une stack moderne sans exécution Python.

- **Frontend**: React + TypeScript + Vite (`/frontend`)
- **API**: Express + TypeScript (`/api`)
- **Base de données (phase 2)**: PostgreSQL via `DATABASE_URL` (fallback mémoire si absent)

## Démarrage rapide

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
