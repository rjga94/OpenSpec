import { describe, expect, it } from 'vitest';
import {
  getOpsxProposeCommandTemplate,
  getOpsxProposeSkillTemplate,
} from '../../../src/core/templates/workflows/propose.js';
import {
  getOpsxApplyCommandTemplate,
  getApplyInstructions,
} from '../../../src/core/templates/workflows/apply-change.js';
import {
  getArchiveChangeSkillTemplate,
  getOpsxArchiveCommandTemplate,
} from '../../../src/core/templates/workflows/archive-change.js';

describe('propose branch creation', () => {
  const surfaces: Array<[string, string]> = [
    ['skill', getOpsxProposeSkillTemplate().instructions],
    ['command', getOpsxProposeCommandTemplate().content],
  ];

  it('creates a new branch from the current checkout before creating the change', () => {
    for (const [label, body] of surfaces) {
      const branch = body.indexOf('git switch -c "openspec/<name>"');
      const change = body.indexOf('openspec new change "<name>"');

      expect(body, label).toContain('git branch --show-current');
      expect(body, label).toContain('do not switch to a default branch');
      expect(body, label).toContain('Never reuse an existing branch');
      expect(body, label).toContain('do not stash, reset, or discard them');
      expect(branch, label).toBeGreaterThanOrEqual(0);
      expect(change, label).toBeGreaterThan(branch);
    }
  });
});

describe('apply completion automation', () => {
  const applySurfaces: Array<[string, string]> = [
    ['skill', getApplyInstructions()],
    ['command', getOpsxApplyCommandTemplate().content],
  ];
  const archiveSurfaces: Array<[string, string]> = [
    ['skill', getArchiveChangeSkillTemplate().instructions],
    ['command', getOpsxArchiveCommandTemplate().content],
  ];

  it('stops before follow-up automation when tasks remain incomplete', () => {
    for (const [label, body] of applySurfaces) {
      expect(body, label).toContain('If any tracked tasks remain incomplete');
      expect(body, label).toContain('Do not sync specs, archive the change, or commit');
      expect(body, label).toContain('state: "all_done"');
    }
  });

  it('syncs, archives, and commits without confirmation after all tasks complete', () => {
    for (const [label, body] of applySurfaces) {
      expect(body, label).toContain('Apply completion mode');
      expect(body, label).toContain('sync its delta specs, archive it, and do not ask for confirmation');
      expect(body, label).toContain('Generate a concise commit message');
      expect(body, label).toMatch(/commit without asking\s+for confirmation/);
      expect(body, label).toMatch(/Do not use `git add \.` or\s+`git add -A`/);
    }
  });

  it('keeps archive confirmation prompts for direct use, but skips them in apply mode', () => {
    for (const [label, body] of archiveSurfaces) {
      const mode = body.indexOf('**Apply completion mode**');
      const prompts = body.indexOf('**Prompt options:**');

      expect(mode, label).toBeGreaterThanOrEqual(0);
      expect(prompts, label).toBeGreaterThan(mode);
      expect(body, label).toMatch(/do not ask for confirmation/);
      expect(body, label).toMatch(/sync delta specs automatically when needed/);
      expect(body, label).toMatch(/Direct archive invocations retain\s+the prompts below/);
    }
  });
});
