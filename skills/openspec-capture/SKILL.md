---
name: openspec-capture
description: Capture durable conversation and project knowledge into the OpenSpec project wiki (openspec/wiki/), including reference files and links. Use when the user wants to preserve lasting project knowledge, with or without a prior explore session. Also use when the user says "openspec capture" or "opsx capture".
allowed-tools: Bash(openspec:*)
license: MIT
compatibility: Requires openspec CLI.
metadata:
  author: openspec
  version: "1.0"
---

Capture durable project knowledge into the wiki.

**This workflow records knowledge; it does not plan or implement.** It writes only to the wiki at `openspec/wiki/` (and the Git LFS files described below). Do not create or edit changes, specs, or project code here.

**Store selection:** If the user names a store (a store is a standalone OpenSpec repo registered on this machine) or the work lives in one, run `openspec store list --json` to discover registered store ids, then pass `--store <id>` on the commands that read or write specs and changes (`new change`, `status`, `instructions`, `list`, `show`, `validate`, `archive`, `doctor`, `context`, `schemas`, `view`). Once selected, treat `--store <id>` as sticky for the rest of the workflow. Every unscoped example of those commands below is shorthand: before running it, append the flag. For example, run `openspec status --change "<name>" --json --store "<id>"`, not the unscoped form shown below. Other commands do not take the flag. Hints printed by commands already carry the flag; keep it on follow-ups. Without a store, commands act on the nearest local `openspec/` root.

**Project check:** These steps expect a project that already uses OpenSpec. Before the first step that writes anything (`new change`, `archive`, `sync specs`, or authoring an artifact file), confirm the project has a root: run `openspec list --json` (with `--store <id>` when a store is selected, since the store is then the root) and read `root`. A root object means the project is set up. `"root": null` means it is not - there is no `openspec/` directory here, and a write such as `openspec new change` would create one as a side effect. The command also exits non-zero, which is that answer rather than a broken CLI, so read the JSON instead of retrying or working around it.

One `"root": null` is not about setup: when a `status` error message starts with `Declared in` or `Invalid store declaration in` and names this project's `openspec/config.yaml` (or `config.yml`), the project does use OpenSpec through a store it declares, which this machine cannot resolve (the store is not registered, or the `store:` line is malformed). Do not treat it as uninitialized and skip the branches below: stop before writing and show the user that error's `message` and `fix`.

Otherwise, with no root, what happens next depends on how this workflow was reached:

- **Auto-selected**: you chose this workflow yourself, without the user naming OpenSpec, naming this skill, or running its slash command. Stop using OpenSpec and answer the request normally, as you would with no OpenSpec installed. Do not ask them to set anything up and do not mention OpenSpec setup.
- **Explicit OpenSpec request**: the user named OpenSpec, named this skill, or ran its slash command. Stop before writing and ask how to proceed: set this project up (`openspec init`), target a store they already have (`--store <id>`), or continue without OpenSpec for this request. Wait for their answer.

In both branches, never create the root as a side effect: do not run `openspec init` until the user asks for it, do not hand-create `openspec/` files, and do not let a command create it.

**Input**: Optionally a focus after the request (for example "capture the auth decisions"). If omitted, capture everything worth keeping from the conversation and relevant project evidence.

It does not matter whether explore was used earlier: capture durable knowledge from the conversation and relevant project evidence.

**Capture procedure** (records durable project knowledge into the wiki):

1. **Resolve the wiki.** Run `openspec context --json` (add `--store "<id>"` when a store is selected). If it reports `no_openspec_root` or fails, write nothing and tell the user the project needs OpenSpec set up first; never create `openspec/` as a side effect. Otherwise the wiki is `<root.path>/openspec/wiki/` (where `root.path` is the root returned by `openspec context --json`, with `--store "<id>"` when a store is selected). The folder is always named `wiki`.

2. **Collect durable knowledge and evidence.** From the whole conversation, collect project background, goals, decisions and their rationale, constraints, open questions, terminology, people and systems involved, and reference material. Also review relevant project evidence; the conversation is not the only source:
   - For a broad or initial capture, including a wiki that exists but lacks established project knowledge, inspect high-signal project documentation and configuration, OpenSpec specs and relevant change artifacts, project structure, and representative source. Capture a useful project overview, architecture, key flows, or design system only when the evidence supports it; do not create empty placeholder pages.
   - For focused or repeated captures, inspect sources relevant to the requested topic and update existing wiki knowledge rather than repeating a broad inventory.
   - Use current source and configuration to describe observed implementation. Use specs, proposals, designs, archived changes, and conversation for requirements, rationale, and historical or planned decisions; label these separately, and report conflicts that cannot be resolved.
   - Link material project claims to portable repository-relative Markdown links that remain valid on Windows, macOS, and Linux so readers can verify them.
   - Keep source review proportional to the topic; do not scan unrelated code or infer undocumented behavior.
   Leave out chit-chat, step-by-step tool output, and anything already recorded. If the conversation and relevant project evidence contain no durable knowledge missing from the wiki, say so and write nothing.

3. **Read before writing.** If the wiki exists, read `index.md` and the pages related to what you collected. Update an existing page in place when the topic is already covered; do not create a second page for the same topic. Preserve edits people made by hand. If the conversation contradicts a page, update it to the newer information, note on the page that it replaces earlier information, and tell the user.

4. **Organize for navigation.** The wiki is a multi-level Markdown knowledge base. Choose categories and page boundaries to fit the knowledge being captured. Possible topics include project context, domain concepts, architecture and decisions, integrations, or research. Create folders and pages only when they help organize real content, not as empty placeholders. Keep an existing layout when it still works. Every folder, including the wiki root and asset folders, has an `index.md` listing its pages and subfolders with a one-line description each. Add every new page to its parent index in the same capture so the whole wiki is reachable from `<wiki>/index.md`. Create the wiki and its root index if they do not exist yet.

5. **Preserve reference material.** Include references from the conversation and relevant project artifacts, such as image paths or links recorded in proposals and designs.
   - Links: record the link, its title, and the date in the page that uses it.
   - Files (images, video, audio, PDFs, Word documents, other files): copy each accessible referenced file that supports captured knowledge into an `assets/` folder inside the wiki and link it from the page that uses it, recording the original source and the capture date. Ensure repository-relative asset links resolve on Windows, macOS, and Linux. Never move or modify the original. If a file is not accessible, record the reference and its original location and tell the user it was not copied.
   - Very large files: state the file's size and ask the user before copying. If they decline, record the reference and original location without copying.
   - **Git LFS, lazily:** only immediately before copying the first binary file in a capture, and not at all for text-only captures, check the project's Git setup. If the project is not a Git repository, skip this. Otherwise run `git lfs version`. If Git LFS is not installed, do not copy the binary: tell the user how to install it, and record the reference and original location instead. If it is installed, check whether `.gitattributes` already tracks the wiki's assets with `filter=lfs` (for example with `git check-attr filter -- <wiki>/assets/<file>`). If not, run `git lfs install --local` and `git lfs track "openspec/wiki/**/assets/**"` from the repository root (adjusting the pattern to the wiki's path relative to it), and tell the user which Git files changed (normally `.gitattributes`); do not ask for confirmation. Do not rewrite history or migrate files that are already committed.

6. **Audit and refactor the whole wiki.** After updating pages and copying accessible files, review the entire wiki tree, not only the paths touched by this capture. Check that every folder has an accurate `index.md`, every page is reachable from the root index, referenced assets are linked from their pages, and all internal page and asset links resolve. Move, rename, split, merge, or deduplicate pages when needed to restore those rules, updating every affected index and link. Preserve unique information and hand edits. Keep existing structure and wording when they already work; do not make cosmetic rewrites.

7. **Stay in bounds.** Write only under the wiki folder, plus the Git LFS files above. Never modify `openspec/specs/`, `openspec/changes/`, or project source. Do not merge wiki content into specs; the wiki is a separate knowledge layer that later proposals draw from.

8. **Report.** List the pages created, updated, moved, or removed; assets copied; and anything not copied and why.

**Guardrails**
- Capture is optional; the user can go straight to planning without it. Do not insist on it
- Never create `openspec/` when the project has no OpenSpec root
- Never write outside the wiki folder, except the Git LFS configuration files when a binary file is about to be added
- Never copy a binary file without Git LFS in place; record the reference instead
- Do not duplicate a topic already in the wiki; update the existing page
- Keep every page reachable through the indexes

When the user is ready to plan a change, point them at `/openspec-propose`, which draws on the wiki.
