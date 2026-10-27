# Tasks

## 1. Capture template and shared fragments

- [x] 1.1 Write the shared capture procedure fragment (read wiki, update in place, indexes, assets, links, lazy LFS, root guard)
- [x] 1.2 Write the shared "consult the wiki" fragment for explore and propose
- [x] 1.3 Add `src/core/templates/workflows/capture.ts` with skill and command templates, and re-export from `skill-templates.ts`

## 2. Workflow registry

- [x] 2.1 Add `capture` to `ALL_WORKFLOWS` and `CORE_WORKFLOWS` in `profiles.ts`
- [x] 2.2 Register it in `skill-generation.ts` (skills and commands)
- [x] 2.3 Add the skill name to `config.ts` and the workflow-to-skill maps in `init.ts`, `profile-sync-drift.ts`, `command-references.ts`
- [x] 2.4 Add the picker entry in `commands/config.ts` and an onboarding hint in `onboarding-commands.ts` (picker done; onboarding hint intentionally skipped)
- [x] 2.5 Check `legacy-cleanup.ts`, `migration.ts`, `tool-detection.ts` and completions for needed changes
- [x] 2.6 Update "six of the twelve" wording in `optional-workflow.ts`

## 3. Existing templates

- [x] 3.1 Explore: consult the wiki, stay read-only, hand off to capture via `optionalWorkflow()`
- [x] 3.2 Propose: consult the wiki
- [x] 3.3 Archive: capture inline before the move, never blocking
- [x] 3.4 Bulk archive: capture once before the first move
- [x] 3.5 Onboard: mention capture in the loop
- [ ] 3.6 Add `wiki/` to the folder list in `github-copilot/cloud-agent.ts`

## 4. Generated artifacts

- [x] 4.1 Build, then run `pnpm generate:skills` to refresh `skills/` including `openspec-capture`
- [x] 4.2 Run `pnpm regen:parity-hashes` and review the moved entries

## 5. Tests

- [x] 5.1 Add a capture template test (wiki path, indexes, assets, LFS ordering and fallback, no spec writes)
- [x] 5.2 Test explore, propose, archive and bulk-archive wiki instructions, and no `/opsx:capture` references without the workflow installed
- [x] 5.3 Update workflow-count and profile tests (`profiles`, `init`, `update`, `tool-detection`, `skill-generation`, `command-references`, `onboarding-commands`, `adapters`, `invocation`, `profile-workflow-references`, `workflow-verb-triggers`, `skillssh-parity`, `warp`)
- [x] 5.4 Run the full test suite and lint

## 6. Docs and release

- [x] 6.1 Add a capture page under `docs/` and `docs-lab/guides/capture.md`; update workflow lists, profiles, glossary, FAQ, commands, README and `AGENTS.md` (docs/ commands, workflows, glossary and README updated; no dedicated page, AGENTS.md has no workflow list)
- [x] 6.2 Reword the "no drifting wiki" positioning line
- [x] 6.3 Add a changeset
- [x] 6.4 Resolve ordering with `extend-config-injection-to-apply-archive` and `simplify-skill-installation` (reviewed: no contradiction; re-check archive templates and MODIFIED requirements when those changes are archived)
