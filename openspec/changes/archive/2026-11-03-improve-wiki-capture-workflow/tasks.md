# Tasks

## 1. Improve evidence-based capture

- [x] 1.1 Expand the canonical capture procedure to review bounded, relevant project evidence, distinguish current implementation from historical intent, and capture supported project overview, architecture, and design-system knowledge; add and pass focused capture-instruction tests
- [x] 1.2 Extend reference discovery to relevant project artifacts as well as conversation attachments, preserving source paths, dates, inaccessible-file reporting, Git LFS behavior, and wiki-only write boundaries; add and pass reference-handling tests

## 2. Unify capture entry points

- [x] 2.1 Route direct capture, Apply, single archive, and bulk archive through the same canonical procedure, including the fallback when capture is not installed; verify generated instructions and preserve lifecycle ordering and archive failure handling in focused workflow tests
- [x] 2.2 Regenerate committed skill outputs and parity hashes from the shared templates; verify the generated skills match their templates with the skill distribution parity tests
- [x] 2.3 Update the archive skill and command's Apply completion mode to proceed when tasks remain unchecked, retain direct-archive prompts and existing artifact/sync blockers, and add focused tests for both surfaces
- [x] 2.4 Regenerate the committed archive skill output and parity hashes after the mode change; verify skill/template parity

## 3. Integration validation

- [x] 3.1 Run the focused capture, optional-workflow, archive, and template-parity test suites, then run `pnpm lint` and `pnpm build`; verify all commands pass
- [x] 3.2 Run the focused workflow and generated-artifact tests on the Windows host and verify they pass in a Windows environment
- [x] 3.3 Re-run the focused capture/archive/template tests, lint, build, and Windows workflow/generated-artifact tests after the archive mode change

## 4. Apply completion

- [x] 4.1 Sync delta specs into main specs and verify all updated capabilities contain the intended requirements
- [x] 4.2 Capture durable project knowledge to the wiki and verify relevant pages and indexes, or report that nothing new needed capture
- [x] 4.3 Archive the change after sync and wiki capture, then verify its archive path
- [x] 4.4 Commit the completed work and verify the resulting commit hash
