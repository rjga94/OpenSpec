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

describe('apply completion automation', () => {
  const applySurfaces: Array<[string, string]> = [
    ['skill', getApplyInstructions()],
    ['command', getOpsxApplyCommandTemplate().content],
  ];
  const archiveSurfaces: Array<[string, string]> = [
    ['skill', getArchiveChangeSkillTemplate().instructions],
    ['command', getOpsxArchiveCommandTemplate().content],
  ];

  it('does not start tracked lifecycle tasks before implementation tasks finish', () => {
    for (const [label, body] of applySurfaces) {
      expect(body, label).toContain('do not start this group until');
      expect(body, label).toContain('every task before it is complete');
      expect(body, label).toContain('If implementation stops while tasks before the Apply completion group remain');
      expect(body, label).toContain('state: "all_done"');
    }
  });

  it('executes tracked lifecycle tasks and avoids repeating automatic closeout', () => {
    for (const [label, body] of applySurfaces) {
      expect(body, label).toContain('Sync delta specs');
      expect(body, label).toContain('Capture wiki knowledge');
      expect(body, label).toContain('openspec archive "<name>" --skip-specs --yes');
      expect(body, label).toContain('Mark the commit checkbox in the archived tasks file');
      expect(body, label).toContain('do not run the automatic closeout again');
      expect(body, label).toContain('For older task files without that group, retain the automatic closeout');
    }
  });

  it('marks the archive task before moving it and handles archive failures safely', () => {
    for (const [label, body] of applySurfaces) {
      const preArchiveCheck = body.indexOf(
        'mark it complete, save the file, and verify that exact checkbox is checked before invoking archive'
      );
      const archive = body.indexOf('openspec archive "<name>" --skip-specs --yes');

      expect(body, label).toContain('locate the archive task checkbox in the active tasks file');
      expect(preArchiveCheck, label).toBeGreaterThanOrEqual(0);
      expect(archive, label).toBeGreaterThan(preArchiveCheck);
      expect(body, label).toContain('confirm the archive task is still checked before continuing');
      expect(body, label).toContain(
        'restore only the archive task checkbox to incomplete, save and verify it, then stop'
      );
      expect(body, label).toContain(
        'if the change has moved, preserve the checked status'
      );
    }
  });

  it('retains automatic closeout for legacy task files', () => {
    for (const [label, body] of applySurfaces) {
      expect(body, label).toContain('state: "all_done"');
      expect(body, label).toContain('Apply completion mode');
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

  it('does not block Apply completion on unchecked tasks or invalidly infer missing task progress', () => {
    for (const [label, body] of archiveSurfaces) {
      expect(body, label).toContain('stop solely because task counts are incomplete');
      expect(body, label).toContain('report the count in the archive summary');
      expect(body, label).toContain('do not stop or prompt solely because tasks remain unchecked');
      expect(body, label).toContain('stop before syncing or archiving');
      expect(body, label).toContain('Still stop and report if artifacts are incomplete');
    }
  });
});
