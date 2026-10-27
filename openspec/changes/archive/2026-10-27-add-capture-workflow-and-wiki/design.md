## Context

Workflows in OpenSpec are skill and command templates generated per tool. The CLI does only deterministic file work. Archive (`openspec archive`) is a CLI command, but the `/opsx:archive` skill drives it, so the skill is where agent-driven steps such as sync already run before the move.

Workflow IDs and skill names are enumerated by hand in about a dozen source files, a checked-in `skills/` mirror, and pinned parity hashes.

## Goals / Non-Goals

**Goals**
- A `capture` step between explore and propose that is optional in use.
- A wiki at `openspec/wiki/` that agents organize, read in explore and propose, and extend in capture and archive.
- Lazy, announced Git LFS setup for binary references.

**Non-Goals**
- No new CLI command, no wiki validation, and no CLI path resolution for the wiki.
- No merging of wiki content into specs.
- No history rewriting or migration of already committed files into LFS.

## Decisions

1. **Template-only.** All behavior lives in `capture.ts` and the other templates. Alternative considered: a `wikiDir` on `PlanningHome`. Rejected because the folder name is fixed and the AI-only constraint was explicit.
2. **Fixed path.** The wiki is `<openspec dir>/wiki/`, derived from the same root the skill already resolves for `changes/` and `specs/` (including a selected store). The folder is never renamed.
3. **Shared capture fragment.** The capture procedure is written once and embedded in capture, archive, and bulk-archive, so the three cannot drift. The explore and propose "consult the wiki" fragment is likewise shared.
4. **Archive embeds capture rather than depending on it.** Unlike sync, `getProfileWorkflows` does not add `capture` for archive. Archive carries the full procedure inline, so it behaves the same whatever is installed. Handoff text to `/opsx:capture` uses `optionalWorkflow()`.
5. **Capture never blocks archive.** If capture stops (for example no Git LFS), archive reports and continues.
6. **Core profile.** `capture` joins `CORE_WORKFLOWS`. The custom-profile conditionals keep generated files free of dead `/opsx:capture` references.
7. **Lazy LFS.** The check runs only immediately before the first binary copy: `git lfs version`, whether the wiki's asset path is covered by a `filter=lfs` rule in `.gitattributes`, and `git lfs install` for the local hooks. Missing pieces are added and reported. Without Git LFS installed, binaries are not copied and the reference is recorded as a link. This is the only write outside `openspec/wiki/`.
8. **Structure by convention.** Root and per-folder `index.md`, `assets/` for copied files, and a source and date line per asset. Layout beyond that is the agent's choice, guided by the content.

## Risks / Trade-offs

- **Prompt-enforced behavior**: nothing in code validates the wiki. Mitigation: template tests assert the instructions exist; the structure rules are simple enough to follow.
- **Archive now does more**: every archive may write wiki pages. Mitigation: it is silent when nothing is new.
- **Repo size**: binaries in Git. Mitigation: LFS setup, and a never-copy-without-LFS rule.
- **Overlap with active changes** (`extend-config-injection-to-apply-archive`, `simplify-skill-installation`) on archive and skill installation. Resolve ordering before implementation.
- **Positioning**: README and docs claim "no drifting wiki" for specs. The wording needs to distinguish a drifting wiki from a captured knowledge layer.

## Migration Plan

Ship in the next release with a changeset. Existing default-profile projects receive the skill on `openspec update`. No data migration.

## Resolved Questions

- Very large files: capture asks the user before copying one, and skips the copy (recording the reference only) if the user declines. The agent picks a reasonable threshold and states it when asking.
- LFS setup announces the `.gitattributes` change and does not ask for confirmation.
