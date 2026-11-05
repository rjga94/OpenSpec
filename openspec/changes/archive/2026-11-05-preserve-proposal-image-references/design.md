# Design

## Context

The proposal workflow generates both skill and command instructions from `src/core/templates/workflows/propose.ts`; `/opsx:ff` separately generates the same kinds of artifacts. The canonical wiki capture procedure is shared from `src/core/templates/workflows/wiki.ts`. Apply runs capture after implementation and spec sync but before archiving, so proposal references must remain available in the active change at that point.

The wiki already has a contract for linking assets, recording their source and capture date, indexing folders, and using Git LFS for binary wiki assets. Proposal currently consults the wiki but does not persist chat image attachments in the change.

## Goals / Non-Goals

**Goals:**

- Retain only user-provided images that materially inform a proposal.
- Keep each image linked to the proposal context that explains its relevance.
- Let the existing Apply capture step transfer those references into the wiki without depending on the original chat attachment remaining available.
- Keep the behavior consistent across proposal-generating skill and command surfaces.

**Non-Goals:**

- Copy every image in a conversation or change.
- Write to the wiki during proposal creation.
- Change the established sync, capture, archive, and commit order.
- Add CLI support for reading chat attachments.

## Decisions

### Store proposal images inside the change

Copy relevant images to a `references/` directory under the resolved `changeRoot`. Use descriptive, unique filenames and repository-relative Markdown links from the proposal or design artifact, with a short caption explaining the decision or requirement each image informed. These links remain valid when the whole change directory moves into the archive. If an attachment cannot be saved from the chat, ask for an accessible file or permission to omit it; do not create a broken link.

This is more durable than a chat-only reference or machine-specific temporary path, and it keeps proposal creation within the change rather than writing to the wiki.

### Share proposal guidance across generation surfaces

Keep the reference-handling instructions consistent for `/opsx:propose`, its command surface, `/opsx:ff`, and its command surface. Prefer shared template guidance over separately maintained copies. No image attachment or no relevant image means no reference directory or extra proposal section is required.

### Copy retained references during canonical capture

During Apply capture, follow only image files linked from the current change's proposal artifacts. Copy them into a change-specific directory under `openspec/wiki/assets/`, then link each copy from the relevant knowledge page and explain its design context. Record provenance as the change name and path relative to its root, plus the capture date; do not leave a wiki link to the active change path, which becomes invalid when the change is archived. Add or update indexes required by the existing wiki contract.

If a reference cannot be copied, keep the existing capture behavior of reporting the reference and the reason rather than implying it was captured. Reuse the current large-file consent and Git LFS safeguards for binary assets; ensure proposal-reference storage is covered as well as wiki assets.

## Risks / Trade-offs

- **An agent may see an image but lack a usable attachment file:** ask the user for an accessible file or to omit it; never silently substitute a generated or reconstructed image.
- **Retaining an image in both the archived change and wiki duplicates binary data:** keep the scope to relevant images and apply the existing size and Git LFS safeguards to both locations.
- **Skill and command output can drift:** exercise all proposal-generation surfaces in template tests and regenerate committed outputs from the canonical templates.
