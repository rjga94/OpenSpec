# Proposal

## Why

Capture currently treats the conversation as its primary knowledge source, so established project knowledge in documentation, OpenSpec artifacts, configuration, and source can remain absent from the wiki. Capture also needs to behave consistently whether the user invokes it directly or it runs as part of Apply or archive.

The archive workflow's explicit Apply-completion mode also rejects a valid closeout when the remaining unchecked tasks are the archive and commit steps themselves. This prevents those tracked lifecycle tasks from being completed in the order the Apply workflow requires.

## What Changes

- Expand capture to combine durable conversation knowledge with a bounded review of relevant project evidence, including documentation, configuration, specs and change artifacts, and representative source.
- On a broad or initial capture, record useful project overview, architecture, and design-system knowledge when the evidence supports it; keep the wiki content-led and avoid invented facts or empty placeholder pages.
- Preserve traceability to the project evidence behind captured facts and retain referenced files, including images, when accessible; record and report references that cannot be copied.
- Route direct capture, Apply, single archive, and bulk archive through one canonical capture procedure. When the capture workflow is unavailable, workflow fallbacks use that same procedure.
- Add coverage to verify capture behavior remains consistent across generated workflow surfaces while preserving existing wiki safety boundaries and archive failure handling.
- In Apply-completion mode, allow archive to continue when task checkboxes remain incomplete, without a confirmation prompt; report the count while retaining artifact, task-lookup, and spec-sync failure checks. Direct archive keeps its existing incomplete-task prompt.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `opsx-capture-skill`: Capture durable knowledge from both conversation and relevant project evidence, and provide one consistent procedure for every capture entry point.
- `project-wiki`: Keep captured project knowledge evidence-based and traceable while preserving the wiki's content-led organization.
- `opsx-archive-skill`: Permit Apply-completion archive when task checkboxes remain incomplete, while preserving direct-archive prompts and other readiness checks.

## Impact

- Capture, Apply, archive, and bulk-archive workflow templates and their generated skill/command surfaces.
- Wiki capture, archive completion-mode, and template parity tests.
- No new CLI surface, dependencies, or changes to project source/spec files during capture.
