# CI/CD Learning Monorepo

A small Nx integrated monorepo for learning CI/CD with:

- Angular frontend (`apps/web`)
- NestJS backend (`apps/api`)
- Shared TypeScript API contracts (`libs/shared/contracts`)
- GitHub Actions pull-request and main-branch CI

## Prerequisites

- Node.js 22 LTS
- npm 10+
- Git

## Install

```bash
npm install
```

Commit the generated `package-lock.json` before enabling `npm ci` in GitHub Actions.

## Run locally

Terminal 1:

```bash
npm run start:api
```

Terminal 2:

```bash
npm run start:web
```

Open http://localhost:4200. The Angular development server proxies `/api` to NestJS on port 3000.

## Validate the repository

```bash
npm run validate
```

This runs lint, test, and build targets across the monorepo.

## Explore Nx

```bash
npm run graph
npx nx show projects
npx nx show project web
npx nx show project api
```

## CI behavior

The workflow in `.github/workflows/ci.yml`:

1. Checks out full Git history.
2. Installs dependencies with `npm ci`.
3. Calculates the correct Nx base and head SHAs.
4. Runs lint, test, and build only for affected projects.
5. Uploads the `dist/` directory as a temporary build artifact.

## Recommended first exercise

1. Create a Git repository and commit the initial project.
2. Push it to GitHub.
3. Open a feature branch.
4. Change `apps/web` and observe which projects run.
5. Change `libs/shared/contracts` and observe that both applications become affected.
# cicd-monorepo
