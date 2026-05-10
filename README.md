# AllAtHand — Frontend

Personal developer knowledge base — store and retrieve errors, snippets, commands, logs, and screenshots.

---

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- React Router 6

---

## Setup

Copy the environment template:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8080` | Backend base URL. Used in API calls and as proxy target in dev server. |
| `VITE_PORT` | `5173` | Port for the Vite dev server. |

> In development, Vite proxies all `/api` requests to `VITE_API_URL`, so CORS is handled automatically by the dev server. In production builds, `VITE_API_URL` must point to the deployed backend.

---

## Running locally

Requires the backend running on `http://localhost:8080`. See [backend README](../AllAthAnd-backend/README.md).

```bash
npm install
npm run dev
```

App available at `http://localhost:5173`.

---

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

---

## Project structure

```
src/
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── pages/        # Route-level components
├── services/     # API communication (api.ts)
├── types/        # TypeScript type definitions
└── lib/          # Utility functions
```

---

## Planned infrastructure

- **Backend:** Java 21 + Spring Boot 3 (REST, JPA)
- **Database:** PostgreSQL
- **Storage:** AWS S3
- **Infra:** Docker · AWS ECS Fargate + ECR + RDS + CloudWatch
- **CI/CD:** GitHub Actions
