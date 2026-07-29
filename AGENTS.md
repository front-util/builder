# @front-utils/builder

Rspack configuration builder library. Pure ESM (`"type": "module"`), published as `@front-utils/builder`.

## Commands

- **Lint**: `npm run check:lint` — runs `eslint --max-warnings=0 --fix` on `src/**/*.js`
- **Publish**: `npm run publish:lib` — `npm publish --access public`
- **No test suite** in this repo.

Pre-commit hook uses `lint-staged` → `npm run check:lint` on `*.js` files (via `simple-git-hooks`).

## Structure

- `src/` — all source, flat (no subdirectories). Entry: `src/index.js`
- `types/index.d.ts` — hand-maintained type declarations (not generated)
- Peer deps: `@rspack/cli`, `@rspack/core`, `@rspack/plugin-react-refresh` (^2.1.0 / ^2.0.0), `@rspack/dev-server` (^2.1.0)
- Lint config: `@front-utils/linter` shared config

## Key conventions

- No TypeScript source — JS with JSDoc `@typedef` + hand-written `.d.ts`. Keep `types/index.d.ts` in sync when changing exports.
- Linter enforces `--max-warnings=0`. Fix all warnings, not just errors.
- ESLint config only covers `./src/**/*.js`.
- `npm` is the package manager. Use `npm` commands for local dev.
- `webpack-merge` is used by `createConfig` to merge base + custom configs.
- Каждая новая задача начинается в новой ветке.
- По окончании задачи проверять линтинг проекта (`npm run check:lint`).
