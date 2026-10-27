/**
 * Skill Template Workflow Modules
 *
 * Capture records the conversation into the project wiki at `openspec/wiki/`.
 */
import type { SkillTemplate, CommandTemplate } from '../types.js';
import { optionalWorkflow } from '../optional-workflow.js';
import { STORE_SELECTION_GUIDANCE } from './store-selection.js';
import { PROJECT_ROOT_GUARD } from './project-root.js';
import { WIKI_CAPTURE_PROCEDURE } from './wiki.js';

const NEXT_STEP_HANDOFF = optionalWorkflow(
  'propose',
  'When the user is ready to plan a change, point them at `/opsx:propose`, which draws on the wiki.',
  'When the user is ready to plan a change, offer to create one from what the wiki now holds.'
);

function buildInstructions(argumentLine: string): string {
  return `Capture the conversation into the project wiki.

**This workflow records knowledge; it does not plan or implement.** It writes only to the wiki at \`openspec/wiki/\` (and the Git LFS files described below). Do not create or edit changes, specs, or project code here.

${STORE_SELECTION_GUIDANCE}

${PROJECT_ROOT_GUARD}

${argumentLine}

It does not matter whether explore was used earlier: capture whatever project knowledge the conversation holds.

${WIKI_CAPTURE_PROCEDURE}

**Guardrails**
- Capture is optional; the user can go straight to planning without it. Do not insist on it
- Never create \`openspec/\` when the project has no OpenSpec root
- Never write outside the wiki folder, except the Git LFS configuration files when a binary file is about to be added
- Never copy a binary file without Git LFS in place; record the reference instead
- Do not duplicate a topic already in the wiki; update the existing page
- Keep every page reachable through the indexes

${NEXT_STEP_HANDOFF}`;
}

export function getCaptureSkillTemplate(): SkillTemplate {
  return {
    name: 'openspec-capture',
    description: 'Capture the current conversation into the OpenSpec project wiki (openspec/wiki/), including reference files and links. Use when the user wants to save what was discussed as lasting project knowledge, with or without a prior explore session. Also use when the user says "openspec capture" or "opsx capture".',
    instructions: buildInstructions(
      '**Input**: Optionally a focus after the request (for example "capture the auth decisions"). If omitted, capture everything worth keeping from the conversation.'
    ),
    license: 'MIT',
    compatibility: 'Requires openspec CLI.',
    metadata: { author: 'openspec', version: '1.0' },
  };
}

export function getOpsxCaptureCommandTemplate(): CommandTemplate {
  return {
    name: 'OPSX: Capture',
    description: 'Capture the conversation into the project wiki (openspec/wiki/)',
    category: 'Workflow',
    tags: ['workflow', 'capture', 'wiki', 'experimental'],
    content: buildInstructions(
      '**Input**: The argument after `/opsx:capture` is an optional focus (for example `/opsx:capture the auth decisions`). If omitted, capture everything worth keeping from the conversation.'
    ),
  };
}
