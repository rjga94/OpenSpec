# Tasks

## 1. Confirm the fork-specific content

- [x] 1.1 Compare committed fork changes with Fission-AI/OpenSpec and confirm which user-visible differences remain unique upstream; exclude uncommitted work and verify each documented claim against the relevant source or spec
- [x] 1.2 Keep docs-lab as the canonical documentation site and install.md as setup guidance; identify canonical upstream links for the README

## 2. Update and verify the README

- [x] 2.1 Rewrite README.md as a concise fork introduction that states the relationship, summarizes only confirmed user-relevant differences, and links to https://github.com/Fission-AI/OpenSpec for general information; verify every statement against task 1.1
- [x] 2.2 Check all README links and renderable Markdown, run git diff --check, and confirm the change is documentation-only with no platform-specific behavior affected

## 3. Apply completion

- [x] 3.1 Confirm no delta specs need syncing because this is documentation-only and skip_specs is true; verify no delta-spec files were created
- [x] 3.2 Capture durable project knowledge to the wiki only if the README work establishes any; otherwise verify no wiki update is needed
- [x] 3.3 Archive the change after the checks above and verify its archive path
- [x] 3.4 Commit the completed work and verify the resulting commit hash
