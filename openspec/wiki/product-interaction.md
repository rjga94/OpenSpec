# Product interaction and styling

## Product principles

OpenSpec's documented product principles are **fluid, not rigid; iterative, not waterfall; easy, not complex; and brownfield-first**. Workflow commands are actions rather than locked phases, so users can revisit planning artifacts when implementation changes their understanding ([README](../../README.md), [concepts](../../docs/concepts.md), [workflows](../../docs/workflows.md)).

## Current interface observations

OpenSpec's primary product surface is a CLI with agent-facing workflow instructions. The shared terminal palette currently defines four neutral shades ([palette.ts](../../src/core/styles/palette.ts)). The setup welcome screen uses cyan artwork, yellow command names, and dimmed supporting copy; its animation is limited to suitable interactive terminals and can be disabled by terminal color settings, an explicit environment variable, terminal width, or a detected reduced-motion preference ([welcome-screen.ts](../../src/ui/welcome-screen.ts)).

The documentation website imports Tailwind and Fumadocs UI's black preset in its global stylesheet ([global.css](../../website/app/global.css)); its dependencies are listed in the [website package manifest](../../website/package.json).

The reviewed files show styling choices for individual surfaces, not a single centralized visual-design contract. Treat this page as a snapshot of implementation and documented product principles, not as a specification for unimplemented UI.
