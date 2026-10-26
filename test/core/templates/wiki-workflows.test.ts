import { describe, expect, it } from 'vitest';

import { ALL_WORKFLOWS, CORE_WORKFLOWS } from '../../../src/core/profiles.js';
import {
  getCommandTemplates,
  getSkillTemplates,
} from '../../../src/core/shared/skill-generation.js';

function skillInstructions(workflowId: string, workflows = ALL_WORKFLOWS): string {
  const entry = getSkillTemplates(workflows).find((item) => item.workflowId === workflowId);
  if (!entry) throw new Error(`Missing skill template for ${workflowId}`);
  return entry.template.instructions;
}

function commandInstructions(workflowId: string, workflows = ALL_WORKFLOWS): string {
  const entry = getCommandTemplates(workflows).find((item) => item.id === workflowId);
  if (!entry) throw new Error(`Missing command template for ${workflowId}`);
  return entry.template.content;
}

describe('wiki workflow prompts', () => {
  it('initializes a foundation wiki and Git only when the project is not already in a repository', () => {
    const skill = skillInstructions('init', CORE_WORKFLOWS);
    const command = commandInstructions('init', CORE_WORKFLOWS);

    expect(skill).toBe(command);
    expect(skill).toContain('Ask one concise question at a time');
    expect(skill).toContain('technology stack and runtimes');
    expect(skill).toContain('architecture and major components');
    expect(skill).toContain('supported platforms');
    expect(skill).toContain('build/run/test/deploy workflows');
    expect(skill).toContain('`openspec/wiki/`');
    expect(skill).toContain('Copy only relevant reference materials');
    expect(skill).toContain('git rev-parse --show-toplevel');
    expect(skill).toContain('each ancestor for `.git` metadata');
    expect(skill).toContain('run `git init` at the project root');
    expect(skill).toContain('Do not stage files, create a commit');
    expect(skill).toContain('Do not create or modify `openspec/specs/`');
  });

  it.each([
    ['skill', skillInstructions('explore', CORE_WORKFLOWS)],
    ['command', commandInstructions('explore', CORE_WORKFLOWS)],
  ])('adds wiki discovery to Explore without changing its read-only stance (%s)', (_surface, body) => {
    expect(body).toContain('<root.path>/openspec/wiki/');
    expect(body).toContain('root `README.md` home page first');
    expect(body).toContain('follow links to only the topic landing pages and focused pages');
    expect(body).toContain("does not change Explore's read-only behavior");
    expect(body.toLowerCase()).toContain('never write code or implement features');
    expect(body).toContain('openspec list --specs');
  });

  it.each([
    ['archive skill', skillInstructions('archive')],
    ['archive command', commandInstructions('archive')],
  ])('adds wiki updates after the existing single-change archive (%s)', (_surface, body) => {
    expect(body).toContain('Check artifact completion status');
    expect(body).toContain('Assess delta spec sync state');
    expect(body).toContain('Perform the archive');
    expect(body).toContain('After the change has been moved successfully');
    expect(body).toContain('<planningHome.root>/openspec/wiki/');
    expect(body).toContain('Markdown wiki, not a flat list of notes');
    expect(body).toContain('Use relative Markdown links');
    expect(body).toContain('topic landing page');
    expect(body).toContain('copy relevant reference files unchanged');
    expect(body).toContain('link to each copy from its topic page');
    expect(body).toContain('report wiki failures separately');
    expect(body).toContain('Update incomplete');
  });

  it.each([
    ['bulk archive skill', skillInstructions('bulk-archive')],
    ['bulk archive command', commandInstructions('bulk-archive')],
  ])('updates the wiki only for successfully archived changes (%s)', (_surface, body) => {
    expect(body).toContain('Detect spec conflicts early');
    expect(body).toContain('Use single confirmation for entire batch');
    expect(body).toContain('After processing the batch');
    expect(body).toContain('Markdown wiki, not a flat list of notes');
    expect(body).toContain('Use relative Markdown links');
    expect(body).toContain('topic landing pages');
    expect(body).toContain('copy relevant reference files unchanged');
    expect(body).toContain('link to each copy from its topic page');
    expect(body).toContain('Exclude blocked, skipped, or failed changes');
    expect(body).toContain('report the archive results and');
  });

  it('keeps Capture limited to the wiki and preserves uncertainty and source provenance', () => {
    const skill = skillInstructions('capture', CORE_WORKFLOWS);
    const command = commandInstructions('capture', CORE_WORKFLOWS);

    expect(skill).toBe(command);
    expect(skill).toContain('<root.path>/openspec/wiki/');
    expect(skill).toContain('Markdown wiki, not a flat list of notes');
    expect(skill).toContain('Keep the root `README.md` as its home page and index');
    expect(skill).toContain('Use relative Markdown links');
    expect(skill).toContain('topic landing page');
    expect(skill).toContain('copy relevant reference files unchanged');
    expect(skill).toContain('link to each copy from its topic page');
    expect(skill).toContain('Confirmed project facts or decisions');
    expect(skill).toContain('Hypotheses or unverified ideas');
    expect(skill).toContain('Open questions');
    expect(skill).toContain('Ideas not yet implemented');
    expect(skill).toContain('Do not create or modify proposals, specs, change artifacts, implementation code');
    expect(skill).toContain('Keep all original reference files unchanged');
  });

  it('does not advertise Capture when a custom profile omits it', () => {
    const workflowsWithoutCapture = ALL_WORKFLOWS.filter((workflow) => workflow !== 'capture');
    const explore = skillInstructions('explore', workflowsWithoutCapture);

    expect(explore).not.toContain('/opsx:capture');
    expect(explore).toContain('offer to enable the Capture workflow');
  });
});
