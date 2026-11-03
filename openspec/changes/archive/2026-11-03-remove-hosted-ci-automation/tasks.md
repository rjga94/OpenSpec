# Tasks

## 1. Remove hosted automation

- [x] 1.1 Delete `.github/workflows/binaries.yml`, `.github/workflows/ci.yml`, `.github/workflows/release-prepare.yml`, `.github/workflows/security.yml`, `.github/workflows/README.md`, `.github/dependabot.yml`, and `.actrc`; verify each listed path is absent and retain `.github` issue templates, `CODEOWNERS`, and the pull request template.
- [x] 1.2 Remove the GitHub Actions CI badge from `README.md`; verify the README no longer links to the removed workflow or displays its status badge.

## 2. Verify local development remains available

- [x] 2.1 Run `pnpm run build`, `pnpm test`, and `pnpm run lint`; verify each completes successfully without GitHub Actions or `act`.
- [x] 2.2 On Windows, verify all explicitly listed workflow and configuration paths are absent using platform-native path resolution; verify the retained local package scripts remain present in `package.json`.

## 3. Apply completion

- [x] 3.1 Sync delta specs into main specs and verify the intended requirements are present or removed.
- [x] 3.2 Capture durable project knowledge to the wiki and verify relevant pages and indexes, or report that nothing new needed capture.
- [x] 3.3 Archive the change after sync and wiki capture, then verify its archive path.
- [x] 3.4 Commit the completed work and verify the resulting commit hash.
