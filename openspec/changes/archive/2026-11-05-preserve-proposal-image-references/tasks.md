# Tasks

## 1. Preserve proposal images through capture

- [x] 1.1 Add shared guidance to Propose and Fast Forward skill/command templates to save only relevant image attachments under the resolved change root's `references/` directory, link and describe them in a proposal artifact, and report unavailable attachments without creating broken links; verify both workflows and missing-attachment behavior with focused `propose.test.ts` coverage.
- [x] 1.2 Extend the canonical wiki capture procedure to copy proposal-linked change references into wiki assets, link them from relevant knowledge pages with stable provenance and design context, maintain indexes, and apply large-file and Git LFS safeguards to both source and wiki copies; verify direct and Apply-triggered capture guidance with `capture-wiki.test.ts`.

## 2. Generated surfaces and cross-platform verification

- [x] 2.1 Regenerate committed skills and command surfaces with `pnpm generate:skills`, refresh parity fixtures with `pnpm regen:parity-hashes`, and verify generated output parity and template behavior with focused proposal, capture, and parity tests.
- [x] 2.2 Add or update path tests using `path.join()` and verify change-local and wiki asset links resolve on Windows; run the focused template suites locally on Windows. The user waived the VS Code Chat pasted-image smoke test.

## 3. Apply completion

- [x] 3.1 Sync delta specs into main specs and verify both capability requirements with `openspec show`.
- [x] 3.2 Capture durable project knowledge to the wiki and verify relevant pages and indexes, or report that nothing new needed capture.
- [x] 3.3 Archive the change after sync and wiki capture, then verify its archive path.
- [x] 3.4 Commit the completed work and verify the resulting commit hash.
