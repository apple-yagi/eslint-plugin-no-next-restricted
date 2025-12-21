# Repository Guidelines

## Project Structure & Module Organization

- Source lives in `src/`; ESLint rules are in `src/rules` (`no-next-link.ts`, `no-next-image.ts`, `no-next-form.ts`) with co-located `.test.ts` files. Shared test helpers sit in `src/__tests__/eslint.ts`.
- Package entry is `src/index.ts`, exporting the plugin, rule map, and `recommended` config; built output is emitted to `dist/` via `pnpm build`.
- Keep new rule files and their tests in the same `src/rules` folder; name rules `no-next-*` to match existing patterns.

## Build, Test, and Development Commands

- Install: `pnpm install` (Node >= 22). The repo uses pnpm workspaces settings via `pnpm-lock.yaml`.
- Build: `pnpm build` runs `tsc` to emit ESM to `dist/`.
- Lint: `pnpm lint` runs Oxlint with `--fix` and denies warnings/type-checks; `pnpm lint:check` runs the same without fixing; formatting is `pnpm format` (with `pnpm format:check` for CI-style checks).
- Test: `pnpm test` runs the Node test runner with `--experimental-strip-types` against `src/**/*.test.ts`.
- Release (maintainers): `pnpm release` calls `changeset publish`; create a changeset when altering public behavior.

## Coding Style & Naming Conventions

- Language: TypeScript with ESM (`"type": "module"`); JSON imports use `with { type: "json" }`.
- Formatting: Oxfmt governs spacing and imports with tabs (`useTabs` in `.oxfmtrc.json`); run `pnpm lint:oxfmt` before sending a PR. Oxlint enforces lint rules via `pnpm lint:oxlint`.
- Exports: Default export for the plugin object; individual rules are named exports (`noNextLink`, etc.). Keep rule IDs kebab-case and test files named `*.test.ts`.

## Testing Guidelines

- Framework: Node’s built-in test runner (`node:test`) with `assert`. Prefer small, isolated lint samples using `createESLint` and `formatLintResults` from `src/__tests__/eslint.ts`.
- Structure tests with `describe`/`it`, asserting exact lint messages (line/column, ruleId, and message). Add positive and negative cases for each rule change.
- Run `pnpm test` and `pnpm lint:tsc` locally; include new tests for any behavior change.

## Commit & Pull Request Guidelines

- Commits: Use clear, present-tense subjects (e.g., `add no-next-form rule check`). Group related changes; avoid noisy reformat-only commits unless purposeful.
- PRs: Describe the behavior change, tests added, and any compatibility notes; link issues when applicable. Include command output for failing or notable cases.
- Versioning: If you change the public API or rule defaults, add a changeset so maintainers can release via `pnpm release`.
