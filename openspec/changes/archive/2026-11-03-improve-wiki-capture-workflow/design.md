# Design

## Context

See proposal.md for the motivation and specs for the observable behavior. The workflow templates currently define shared capture guidance, but it is conversation-centered. Apply can delegate to `/opsx:capture` or use an inline fallback, while archive and bulk archive embed the shared procedure. Existing tests cover basic capture content and archive surfaces, but do not verify evidence-based capture or parity across all entry points.

## Goals / Non-Goals

**Goals:**
- Keep one authoring source for the complete capture procedure and make every capture entry point consume it.
- Make initial and broad captures review relevant project evidence, while keeping incremental captures focused.
- Preserve evidence links, reference assets, current-versus-historical distinctions, existing wiki edits, and lifecycle safety behavior.

**Non-Goals:**
- Introduce a new CLI command, fixed wiki taxonomy, or automatic code/spec edits during capture.
- Backfill any existing project's wiki as part of this change.
- Expand the unrelated workflow-template generation refactor.

## Decisions

### One canonical capture procedure

Keep the full capture procedure in the shared wiki workflow module, or its direct equivalent if the template pipeline changes. The standalone capture skill and command, Apply capture task, and single/bulk archive fallbacks consume that same procedure. A workflow may hand off to `/opsx:capture` when installed; when it is absent, its generated instructions use the same canonical procedure rather than a separately authored variant.

This preserves support for custom profiles that omit capture while keeping behavior consistent. It also avoids making archive depend on a separate workflow being installed. Retain the existing lifecycle ordering: Apply captures before archive, single archive captures before moving the change, bulk archive captures once before moving the first change, and capture failure does not block archive.

Alternative considered: make all lifecycle workflows invoke `/opsx:capture` unconditionally. Rejected because custom profiles can omit capture, and archive must remain able to proceed with its inline fallback.

### Bounded evidence review

Use the conversation for decisions, rationale, constraints, open questions, and references. Use current project documentation, configuration, OpenSpec specs, and relevant source as evidence of implemented behavior and architecture. Use active or archived change artifacts to understand planned or historical intent. For broad initial capture, inspect high-signal project documents and structure, then representative source; for a focused or incremental capture, inspect only sources relevant to that topic.

Do not scan the entire source tree indiscriminately. When evidence conflicts, distinguish current implementation from historical intent and report material conflicts that cannot be resolved. This keeps capture useful without turning it into exhaustive code documentation.

### Evidence-led wiki content

Add project overview, architecture, and design-system knowledge when the repository provides evidence for it. Keep page boundaries content-led; do not require these pages for projects where the knowledge is absent or not useful. Link material claims to repository-relative evidence so later readers can verify and refresh them. Preserve existing pages and human edits, updating them in place rather than creating duplicate topics.

### Apply completion mode and pending tasks

The explicit Apply-completion handoff is trusted to have completed the tasks that precede lifecycle closeout. Archive must therefore not stop or ask for confirmation solely because task checkboxes remain incomplete: the archive and commit steps may themselves be tracked and cannot be checked until after they run. Keep validating the task-progress lookup and counts, and report any remaining task count in the archive summary. Incomplete artifacts and spec-sync blockers remain hard stops. Direct archive behavior is unchanged: it warns about incomplete tasks and asks the user whether to proceed.

### Reference discovery and safety

Consider references present in the conversation and relevant project artifacts, including image paths or links in proposal and design files. Copy accessible reference files under wiki assets and record their origin and capture date. If a file is inaccessible, preserve its reference and report that it was not copied. Keep the existing large-file confirmation and lazy Git LFS behavior.

Capture continues to write only under the wiki, except for the existing Git LFS configuration changes needed for binary assets. It does not modify specs, changes, or project source.

### Parity validation

Test the canonical content and required behavior through the direct skill and command, Apply, single archive, and bulk archive. Exercise both profile cases for lifecycle workflows: capture installed and capture omitted. Verify that every fallback uses the same canonical procedure and that archive ordering and non-blocking failure guidance remain present.

Also verify that both generated archive surfaces allow an explicit Apply-completion handoff to continue with incomplete task checkboxes, while direct archive still prompts and invalid progress lookups remain blocking.

## Risks / Trade-offs

- **Evidence review adds work to capture** → Keep broad baseline discovery to high-signal files and make focused captures inspect only relevant sources.
- **Wiki facts can become stale** → Link material claims to their source and distinguish current implementation from historical decisions.
- **Generated workflow surfaces may drift** → Test all generated entry points against the canonical capture content and regenerate packaged outputs through the existing pipeline.
- **Unchecked tasks could be mistaken for completed work** → Limit the exception to the explicit Apply-completion handoff, which follows Apply's sequencing; retain artifact and sync blockers, validate task-progress data, report pending counts, and preserve direct-archive prompts.
- **Existing wikis will not be backfilled automatically** → Keep the change limited to workflow behavior; users can run the updated capture workflow to enrich an existing wiki.

## Migration Plan

Regenerate the project's packaged workflow artifacts using the existing generation process. Existing project wikis remain untouched until their users run capture with the updated workflow. No rollback or data migration is required beyond reverting the template and generated-artifact changes.
