# AllAtHand

Personal developer knowledge base — store and retrieve errors, snippets, commands, logs, and screenshots.

## Stack

- **Frontend:** React 18 + TypeScript + Vite + shadcn/ui + Tailwind CSS
- **Backend (planned):** Java + Spring Boot (REST, JPA, Servlets)
- **Database (planned):** PostgreSQL
- **Storage (planned):** AWS S3
- **Infra (planned):** Docker · AWS ECS Fargate + ECR + RDS + CloudWatch
- **CI/CD (planned):** GitHub Actions

## Development

```bash
npm install
npm run dev     # http://localhost:8080
npm run build
npm test
```

## Project structure

```
src/
├── components/     # UI components
│   └── ui/         # shadcn/ui primitives
├── hooks/          # Custom hooks
├── lib/            # Utilities
├── pages/          # Route pages
├── services/       # API service layer (mock → real backend)
└── types/          # TypeScript interfaces
```
