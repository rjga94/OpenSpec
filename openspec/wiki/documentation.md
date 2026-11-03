# Documentation ownership

## Source and publishing flow

The live documentation site is generated from Markdown in `docs-lab/`. `website/docs.sync.config.mjs` selects which source files are published, assigns their URLs and sidebar locations, and `website/scripts/sync-docs.mjs` mirrors them into the site's generated content. The website package runs that sync before its build ([site content manifest](../../website/docs.sync.config.mjs), [website package scripts](../../website/package.json), [docs-lab README](../../docs-lab/README.md)).

The older `docs/` tree remains useful source material, but the docs-lab README says it is no longer the site's authoring source. When documenting the current site, use `docs-lab/` and the publishing manifest rather than assuming every Markdown file in `docs/` is published.

## Draft boundaries

`docs-lab/README.md` describes the tree as a page-by-page rebuild with some pages still skeletons. The site manifest confirms this by keeping some sections, including architecture, commented out of the published navigation. In particular, the architecture reference pages are marked as unwritten drafts; do not treat their headings as established architectural guidance ([docs-lab README](../../docs-lab/README.md), [architecture index](../../docs-lab/reference/architecture/index.md), [site content manifest](../../website/docs.sync.config.mjs)).

## Where to verify a claim

- Use `openspec/specs/` for the intended product behavior contract.
- Use source under `src/` and the relevant tests for current implementation.
- Use `docs-lab/` plus `website/docs.sync.config.mjs` for current published documentation.
- Use `docs/` as legacy or migration source material unless a page is explicitly still maintained there.

## Platform-dependent tests

The test suite includes cases that require filesystem symlink permissions or a runnable Bash shell. Symlink tests skip only when the OS denies creation with `EPERM` or `EACCES`; the `update-flake.sh` test skips only when a Bash probe cannot run. These cases still execute where the required capability is available ([symlink helper](../../test/helpers/symlink.ts), [flake script test](../../test/update-flake-script.test.ts), [test command](../../package.json)).
