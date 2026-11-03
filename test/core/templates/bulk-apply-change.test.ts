import { describe, expect, it } from 'vitest';

import {
  getBulkApplyChangeSkillTemplate,
  getOpsxBulkApplyCommandTemplate,
} from '../../../src/core/templates/workflows/bulk-apply-change.js';
import { getApplyInstructions } from '../../../src/core/templates/workflows/apply-change.js';

const skill = getBulkApplyChangeSkillTemplate();
const command = getOpsxBulkApplyCommandTemplate();
const surfaces: Array<[string, string]> = [
  ['skill', skill.instructions],
  ['command', command.content],
];

describe('bulk apply workflow template', () => {
  it('provides the same batch instructions through both generated surfaces', () => {
    expect(skill.name).toBe('openspec-bulk-apply-change');
    expect(command.name).toBe('OPSX: Bulk Apply');
    expect(skill.instructions).toBe(command.content);
  });

  it('uses all active changes by default and validates explicit names', () => {
    for (const [label, body] of surfaces) {
      expect(body, label).toContain('applies all active changes by default');
      expect(body, label).toContain('select every active change');
      expect(body, label).toContain('select exactly those names');
      expect(body, label).toContain('If a supplied name is missing or duplicated');
      expect(body, label).toContain('stop before editing');
    }
  });

  it('orders selected prerequisites before dependents without using creation dates', () => {
    for (const [label, body] of surfaces) {
      expect(body, label).toContain('selected prerequisites before the changes that depend on them');
      expect(body, label).toContain('Never use creation date as the ordering rule');
      expect(body, label).toContain('Show the ordered list with a short rationale');
      expect(body, label).toContain('ask before editing');
    }
  });

  it('distinguishes blocked changes in default and explicitly named batches', () => {
    for (const [label, body] of surfaces) {
      expect(body, label).toContain('In an all-active batch');
      expect(body, label).toMatch(/report and skip changes whose apply state is\s+blocked/);
      expect(body, label).toContain('In an explicitly named batch');
      expect(body, label).toMatch(/stop when the ordered run reaches a\s+blocked change/);
    }
  });

  it('reconciles each later change against completed work before applying it', () => {
    for (const [label, body] of surfaces) {
      const reconciliation = body.indexOf('Before every later change');
      const adaptation = body.indexOf('Automatically adapt the current change');
      const refresh = body.indexOf('After adapting planning artifacts');

      expect(reconciliation, label).toBeGreaterThanOrEqual(0);
      expect(adaptation, label).toBeGreaterThan(reconciliation);
      expect(refresh, label).toBeGreaterThan(adaptation);
      expect(body, label).toContain('all earlier completed changes');
      expect(body, label).toContain('current code');
      expect(body, label).toMatch(/current proposal's original\s+scope/);
      expect(body, label).toContain('completed task progress');
      expect(body, label).toContain('Do not rewrite proposals');
    }
  });

  it('stops before adapting across either protected boundary', () => {
    for (const [label, body] of surfaces) {
      expect(body, label).toContain("materially change the current proposal's original");
      expect(body, label).toContain('externally observable behavior');
      expect(body, label).toMatch(/stop before editing\s+the plan or code/);
      expect(body, label).toMatch(/ask\s+the user\s+how to proceed/);
    }
  });

  it('stops after implementation errors and retains the complete single-change Apply procedure', () => {
    for (const [label, body] of surfaces) {
      expect(body, label).toContain('If implementation encounters an error or material ambiguity');
      expect(body, label).toMatch(/Do\s+not start any later changes/);
      const completeApplyProcedure = getApplyInstructions()
        .replaceAll('`/opsx:apply add-auth`', '`the current batch entry`')
        .replaceAll('`/opsx:apply <other>`', '`the current batch entry`')
        .replaceAll('`/opsx:apply` again', 'the batch apply command again');
      expect(body, label).toContain(completeApplyProcedure);
    }
  });
});
