import { describe, expect, it } from 'vitest';

import {
  getArchiveChangeSkillTemplate,
  getBulkArchiveChangeSkillTemplate,
  getCaptureSkillTemplate,
  getExploreSkillTemplate,
  getOpsxCaptureCommandTemplate,
  getOpsxProposeSkillTemplate,
} from '../../../src/core/templates/skill-templates.js';

const capture = getCaptureSkillTemplate();

describe('capture skill', () => {
  it('is named openspec-capture and targets openspec/wiki/', () => {
    expect(capture.name).toBe('openspec-capture');
    expect(capture.instructions).toContain('openspec/wiki/');
    expect(getOpsxCaptureCommandTemplate().content).toContain('openspec/wiki/');
  });

  it('resolves the root through openspec context', () => {
    expect(capture.instructions).toContain('openspec context --json');
  });

  it('configures Git LFS lazily and tells the user instead of asking', () => {
    const text = capture.instructions;
    expect(text).toContain('git lfs');
    expect(text).toContain('.gitattributes');
    expect(text.indexOf('git check-attr')).toBeLessThan(text.indexOf('git lfs track'));
    expect(text).toContain('do not ask for confirmation');
  });

  it('asks before copying very large files', () => {
    expect(capture.instructions).toMatch(/very large/i);
    expect(capture.instructions).toMatch(/ask/i);
  });

  it('does not write specs or change artifacts', () => {
    expect(capture.instructions).toMatch(/never (write|create|modify)[^.]*(spec|change)/i);
  });
});

describe('wiki consultation and archive capture', () => {
  it('explore and propose read the wiki', () => {
    expect(getExploreSkillTemplate().instructions).toContain('openspec/wiki/');
    expect(getOpsxProposeSkillTemplate().instructions).toContain('openspec/wiki/');
  });

  it('archive and bulk archive capture to the wiki without requiring the capture skill', () => {
    for (const template of [getArchiveChangeSkillTemplate(), getBulkArchiveChangeSkillTemplate()]) {
      expect(template.instructions).toContain('openspec/wiki/');
      expect(template.instructions).toContain('openspec context --json');
    }
  });
});
