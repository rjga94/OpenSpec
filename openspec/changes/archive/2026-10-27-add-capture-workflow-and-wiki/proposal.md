# Proposal

## Why

Discussion in a chat is where most project knowledge is created, and it is lost when the session ends. Explore produces thinking but nothing durable unless a change is scaffolded, and specs only describe settled behavior. There is no place for everything else that is known about the project: background, decisions, reference material, source files.

A project wiki, kept next to the specs and fed by the conversation, gives explore and propose a grounded starting point and gives later proposals a source to be extracted from.

## What Changes

- Add a `capture` workflow (`/opsx:capture`) between explore and propose. It records the current conversation into the wiki, whether or not explore was used first.
- Add the wiki at `openspec/wiki/`, always with that name. It is a navigable, multi-level knowledge base organized by the agent for easy reading and editing, with `index.md` files at every level.
- Copy reference material the conversation relies on (images, video, audio, PDFs, Word documents, other files) into the wiki and record links as entries, each with its source and date.
- Set up Git LFS lazily: before the first binary reference is copied, check whether Git LFS is available and configured for the wiki's asset paths, and configure it if not, telling the user what changed.
- Make explore and propose consult the wiki before they start. Explore stays read-only for the wiki.
- Make archive (and bulk archive) run capture behind the scenes before the change is moved, so capture can be skipped as a manual step.
- Add `capture` to the core profile. The workflow remains optional in use: users can go straight from explore or from nothing to propose, apply, archive.
- The wiki is a separate knowledge layer. It is never merged into `openspec/specs/`.
- Everything is implemented in skill and command templates. There is no new CLI command and no change to path resolution.

## Capabilities

### New Capabilities
- `opsx-capture-skill`: the `/opsx:capture` skill: what it records, how it handles reference files, the lazy Git LFS setup, and how it behaves on repeat runs.
- `project-wiki`: the structure and conventions of `openspec/wiki/`: location, navigation indexes, asset handling, and its separation from specs.

### Modified Capabilities
- `opsx-archive-skill`: archive runs capture before moving a change, including when capture is not installed as its own workflow.
- `cli-init`: `capture` is generated like other workflows and is part of the default profile.

## Impact

- **Workflow registry**: `profiles.ts`, `skill-generation.ts`, `config.ts`, `init.ts`, `profile-sync-drift.ts`, `command-references.ts`, `commands/config.ts`, `onboarding-commands.ts`, plus checks in `legacy-cleanup.ts`, `migration.ts`, `tool-detection.ts`.
- **Templates**: new `capture.ts`; edits to `explore.ts`, `propose.ts`, `archive-change.ts`, `bulk-archive-change.ts`, `onboard.ts`; shared capture fragment.
- **Generated output**: `skills/` (skills.sh mirror) and the parity hashes in `skill-templates-parity.test.ts`.
- **Specs**: two new capability specs and two delta specs. Check for overlap with the active changes `extend-config-injection-to-apply-archive` and `simplify-skill-installation`.
- **Docs**: `docs/`, `docs-lab/`, `README.md`, `AGENTS.md`, `github-copilot/cloud-agent.ts` (folder list). Reword the "no drifting wiki" positioning line.
- **Users**: existing projects gain the `capture` skill on `openspec update`. Archive behavior changes for everyone, since it now captures first.
