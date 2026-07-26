# Lesson 1 — Local Quality Gate and First CI

## Architecture

```text
Angular web ───┐
               ├── shared-contracts
NestJS API ────┘
```

## Local commands

```bash
npm run lint
npm run test
npm run build
npm run validate
```

## Key CI/CD observations

- Each Nx project is independently testable and buildable.
- A change in a shared library can affect multiple applications.
- A pipeline relies on command exit codes: `0` means success and non-zero means failure.
- Build artifacts should be produced once and later promoted rather than rebuilt per environment.
- Full Git history is required for reliable affected-project calculation.

## Experiments

### Experiment 1: Make the web build fail

Add an invalid assignment to `apps/web/src/app/app.component.ts`, run `npm run build`, inspect the failure, then revert it.

### Experiment 2: Observe caching

Run `npm run validate` twice. The second execution should reuse cached results for unchanged tasks.

### Experiment 3: Observe affected projects

After the first Git commit:

```bash
git checkout -b feature/web-title
# modify only apps/web
npx nx affected -t lint test build --base=main --head=HEAD
```

Then modify `libs/shared/contracts` and run the same affected command again.
