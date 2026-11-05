import path from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  getApplyChangeSkillTemplate,
  getArchiveChangeSkillTemplate,
  getBulkArchiveChangeSkillTemplate,
  getCaptureSkillTemplate,
  getExploreSkillTemplate,
  getOpsxApplyCommandTemplate,
  getOpsxCaptureCommandTemplate,
  getOpsxProposeSkillTemplate,
} from '../../../src/core/templates/skill-templates.js';
import { resolveOptionalWorkflows } from '../../../src/core/templates/optional-workflow.js';
import { WIKI_CAPTURE_PROCEDURE } from '../../../src/core/templates/workflows/wiki.js';

const capture = getCaptureSkillTemplate();

describe('capture skill', () => {
  it('is named openspec-capture and targets openspec/wiki/', () => {
    expect(capture.name).toBe('openspec-capture');
    expect(capture.instructions).toContain('openspec/wiki/');
    expect(getOpsxCaptureCommandTemplate().content).toContain('openspec/wiki/');
    expect(getOpsxCaptureCommandTemplate().content).toContain('review the entire wiki tree');
  });

  it('resolves the root through openspec context', () => {
    expect(capture.instructions).toContain('openspec context --json');
  });

  it('grounds broad capture in bounded project evidence', () => {
    const instructions = capture.instructions;
    expect(instructions).toContain('relevant project evidence');
    expect(instructions).toContain('high-signal project documentation and configuration');
    expect(instructions).toContain('project overview, architecture, key flows, or design system');
    expect(instructions).toContain('Use current source and configuration to describe observed implementation');
    expect(instructions).toContain('historical or planned decisions');
    expect(instructions).toContain('portable repository-relative Markdown links');
    expect(instructions).toContain('remain valid on Windows, macOS, and Linux');
    expect(instructions).toContain('do not scan unrelated code');
  });

  it('configures Git LFS lazily and tells the user instead of asking', () => {
    const text = capture.instructions;
    expect(text).toContain('git lfs');
    expect(text).toContain('.gitattributes');
    expect(text.indexOf('git check-attr')).toBeLessThan(text.indexOf('git lfs track'));
    expect(text).toContain('do not ask for confirmation');
  });

  it('preserves references from conversation and relevant project artifacts', () => {
    for (const text of [capture.instructions, getOpsxCaptureCommandTemplate().content]) {
      expect(text).toContain('conversation and relevant project artifacts');
      expect(text).toContain('image paths or links recorded in proposals and designs');
      expect(text).toContain('recording the original source and the capture date');
      expect(text).toContain('If a file is not accessible');
      expect(text).toContain('its original location');
    }
  });

  it('copies proposal-linked images with durable provenance in direct and Apply capture', () => {
    const applySurfaces = [
      getApplyChangeSkillTemplate().instructions,
      getOpsxApplyCommandTemplate().content,
    ];
    const applyWithCapture = applySurfaces.map((surface) =>
      resolveOptionalWorkflows(surface, new Set(['capture', 'archive', 'sync']))
    );

    for (const text of [
      capture.instructions,
      getOpsxCaptureCommandTemplate().content,
      ...applySurfaces.map((surface) =>
        resolveOptionalWorkflows(surface, new Set(['archive', 'sync']))
      ),
      getArchiveChangeSkillTemplate().instructions,
      getBulkArchiveChangeSkillTemplate().instructions,
    ]) {
      expect(text).toContain("current change's proposal or design links an image");
      expect(text).toContain('<wiki>/assets/<change-name>/');
      expect(text).toContain('reference path relative to the change root');
      expect(text).toContain('Do not link the wiki page to the active change path');
      expect(text).toContain('source under the change');
      expect(text).toContain('patterns covering the resolved wiki assets and change-reference paths');
    }

    for (const text of applyWithCapture) {
      expect(text).toContain('run `/opsx:capture` to apply the canonical capture procedure');
    }
  });

  it('asks before copying very large files', () => {
    expect(capture.instructions).toMatch(/very large/i);
    expect(capture.instructions).toMatch(/ask/i);
  });

  it('audits and refactors the whole wiki for structural and navigational rules', () => {
    expect(capture.instructions).toContain('review the entire wiki tree');
    expect(capture.instructions).toContain('every page is reachable from the root index');
    expect(capture.instructions).toContain('referenced assets are linked from their pages');
    expect(capture.instructions).toContain('all internal page and asset links resolve');
    expect(capture.instructions).toContain('Preserve unique information and hand edits');
    expect(capture.instructions).toContain('do not make cosmetic rewrites');
    expect(capture.instructions).toContain('pages created, updated, moved, or removed');
  });

  it('guides content-led organization without imposing a fixed wiki template', () => {
    expect(capture.instructions).toContain(
      'Choose categories and page boundaries to fit the knowledge being captured',
    );
    expect(capture.instructions).toContain('Possible topics include project context');
    expect(capture.instructions).toContain('not as empty placeholders');
    expect(capture.instructions).toContain('Keep an existing layout when it still works');
  });

  it('does not write specs or change artifacts', () => {
    expect(capture.instructions).toMatch(/never (write|create|modify)[^.]*(spec|change)/i);
  });
});

describe('wiki consultation and archive capture', () => {
  it('resolves proposal and wiki asset links with native Windows paths', () => {
    const repoRoot = path.join('repo');
    const changeRoot = path.join(repoRoot, 'openspec', 'changes', 'example-change');
    const proposal = path.join(changeRoot, 'proposal.md');
    const reference = path.join(changeRoot, 'references', 'screen.png');
    const wikiPage = path.join(repoRoot, 'openspec', 'wiki', 'decisions.md');
    const wikiAsset = path.join(
      repoRoot,
      'openspec',
      'wiki',
      'assets',
      'example-change',
      'screen.png',
    );
    const proposalLink = path
      .relative(path.dirname(proposal), reference)
      .split(path.sep)
      .join('/');
    const wikiLink = path
      .relative(path.dirname(wikiPage), wikiAsset)
      .split(path.sep)
      .join('/');

    expect(proposalLink).toBe(
      path.join('references', 'screen.png').split(path.sep).join('/'),
    );
    expect(wikiLink).toBe(
      path.join('assets', 'example-change', 'screen.png').split(path.sep).join('/'),
    );
    expect(path.resolve(path.dirname(proposal), proposalLink)).toBe(path.resolve(reference));
    expect(path.resolve(path.dirname(wikiPage), wikiLink)).toBe(path.resolve(wikiAsset));
  });

  it('explore and propose read the wiki', () => {
    expect(getExploreSkillTemplate().instructions).toContain('openspec/wiki/');
    expect(getOpsxProposeSkillTemplate().instructions).toContain('openspec/wiki/');
  });

  it('uses the canonical capture procedure across every capture entry point', () => {
    const archive = getArchiveChangeSkillTemplate().instructions;
    const bulkArchive = getBulkArchiveChangeSkillTemplate().instructions;
    const directCapture = [
      capture.instructions,
      getOpsxCaptureCommandTemplate().content,
      archive,
      bulkArchive,
    ];

    for (const text of directCapture) {
      expect(text).toContain(WIKI_CAPTURE_PROCEDURE);
    }

    const applySurfaces = [
      getApplyChangeSkillTemplate().instructions,
      getOpsxApplyCommandTemplate().content,
    ];
    for (const text of applySurfaces) {
      const withCapture = resolveOptionalWorkflows(text, new Set(['capture', 'archive', 'sync']));
      const withoutCapture = resolveOptionalWorkflows(text, new Set(['archive', 'sync']));

      expect(withCapture).toContain('run `/opsx:capture` to apply the canonical capture procedure');
      expect(withCapture).not.toContain(WIKI_CAPTURE_PROCEDURE);
      expect(withoutCapture).toContain('perform wiki capture inline using the canonical capture procedure below');
      expect(withoutCapture).toContain(WIKI_CAPTURE_PROCEDURE);
      expect(withCapture.indexOf('Capture wiki knowledge')).toBeLessThan(
        withCapture.indexOf('Archive the change')
      );
    }

    expect(archive).toContain('never let a capture problem block the archive');
    expect(bulkArchive).toContain('Capture to the wiki once, before the first change is moved');
  });

  it('archive and bulk archive capture to the wiki without requiring the capture skill', () => {
    for (const template of [getArchiveChangeSkillTemplate(), getBulkArchiveChangeSkillTemplate()]) {
      expect(template.instructions).toContain('openspec/wiki/');
      expect(template.instructions).toContain('openspec context --json');
      expect(template.instructions).toContain('review the entire wiki tree');
    }
  });
});
