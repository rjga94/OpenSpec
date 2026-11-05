# opsx-capture-skill Specification

## Purpose
Provides the `/opsx:capture` workflow for recording durable, evidence-based project knowledge in `openspec/wiki/` and keeping its pages, indexes, and references consistent.

## Requirements

### Requirement: Capture workflow

The system SHALL provide an `/opsx:capture` skill that records durable project knowledge from the current conversation and relevant project evidence into the wiki at `openspec/wiki/`, whether or not explore was used earlier in the conversation.

#### Scenario: Capture after explore

- **WHEN** the user runs `/opsx:capture` after an explore session
- **THEN** the agent records durable discussion and relevant project evidence into the wiki
- **AND** reports which wiki pages it created or updated

#### Scenario: Capture without prior explore

- **WHEN** the user runs `/opsx:capture` in a conversation that never used explore
- **THEN** the agent captures knowledge from the conversation and relevant project evidence the same way

#### Scenario: Capture initial project knowledge

- **WHEN** the user requests a broad capture and the wiki is new or lacks established project knowledge
- **AND** relevant project evidence documents its overview, architecture, or design system
- **THEN** the agent captures that supported knowledge and its sources
- **AND** does not create unsupported or empty placeholder pages

#### Scenario: Optional step

- **WHEN** the user goes from explore, or from nothing, directly to propose
- **THEN** the workflow proceeds without requiring capture

#### Scenario: Nothing worth capturing

- **WHEN** the conversation and relevant project evidence contain no durable knowledge missing from the wiki
- **THEN** the agent says so and writes nothing

### Requirement: Evidence-based project knowledge

The capture workflow SHALL use relevant project evidence to verify or enrich durable knowledge and distinguish current implementation from planned or historical decisions.

#### Scenario: Relevant project evidence

- **WHEN** a broad or focused capture concerns project behavior or structure
- **THEN** the agent reviews relevant documentation, configuration, OpenSpec artifacts, or representative source
- **AND** records only conclusions supported by that evidence

#### Scenario: Current implementation differs from historical intent

- **WHEN** current source conflicts with a proposal, design, or archived decision
- **THEN** the wiki identifies current implementation separately from historical intent
- **AND** reports any material unresolved conflict

### Requirement: Capture entry points share behavior

Direct capture and workflow-triggered capture SHALL apply the same knowledge selection, reference preservation, wiki structure, and safety rules.

#### Scenario: Capture from a workflow

- **WHEN** capture runs through Apply, single archive, or bulk archive
- **THEN** it follows the same capture behavior as `/opsx:capture`

#### Scenario: Capture workflow is unavailable

- **WHEN** a lifecycle workflow must capture knowledge but `/opsx:capture` is not installed
- **THEN** it performs capture using the same canonical procedure
- **AND** preserves the lifecycle workflow's existing ordering and failure behavior

### Requirement: Wiki is updated, not duplicated

The skill SHALL read the existing wiki before writing and update existing pages in place where the topic is already covered.

#### Scenario: Repeat capture on the same topic

- **WHEN** the topic was captured before
- **THEN** the agent updates the existing page and its index entries
- **AND** does not create a second page for the same topic

#### Scenario: Conflicting information

- **WHEN** the conversation contradicts a wiki page
- **THEN** the agent updates the page to the newer information
- **AND** states in the page that it replaces earlier information, and tells the user

### Requirement: Wiki structure stays navigable

The skill SHALL audit the entire wiki after each capture and refactor it as needed to preserve its structural and navigation rules.

#### Scenario: Existing wiki needs restructuring

- **WHEN** a capture finds missing or inaccurate indexes, unreachable pages or assets, or broken internal links anywhere in the wiki
- **THEN** the agent repairs the structure and links, including moving or reorganizing pages when needed
- **AND** preserves unique information and hand edits
- **AND** reports pages moved or removed

#### Scenario: Structure follows captured content

- **WHEN** the agent organizes or refactors the wiki
- **THEN** it uses categories that fit the project knowledge rather than requiring a predefined taxonomy
- **AND** treats example topics as suggestions, not required sections
- **AND** avoids empty folders and placeholder pages
- **AND** preserves an existing layout when it still works

### Requirement: Reference material is preserved

The skill SHALL preserve reference files and links relied on by the conversation or relevant project evidence, recording their source and capture date in the wiki.

#### Scenario: Referenced file
- **WHEN** the conversation or a relevant project artifact refers to an image, video, audio file, PDF, Word document, or other file that supports captured knowledge
- **THEN** the agent copies the file under the wiki's assets when accessible
- **AND** the page that uses it links to the copy and records the original source and capture date
- **AND** repository-relative asset links resolve on Windows, macOS, and Linux

#### Scenario: Proposal image retained in a change
- **WHEN** a proposal artifact links to a user-provided image retained in that change
- **AND** capture records knowledge about the change
- **THEN** the agent copies the linked image under the wiki's assets
- **AND** links to the copy from a wiki page that describes the decision or requirement the image informed
- **AND** records the source change, reference path, and capture date without relying on a path that becomes invalid when the change is archived

#### Scenario: Referenced link
- **WHEN** the conversation or a relevant project artifact relies on a web link
- **THEN** the agent records the link, its title, and the date in the relevant page

#### Scenario: File cannot be copied

- **WHEN** a referenced file is not accessible to the agent
- **THEN** the agent records the reference and its original location
- **AND** tells the user it was not copied

### Requirement: Confirm very large files

The skill SHALL ask the user before copying a very large reference file into the wiki.

#### Scenario: User approves

- **WHEN** a referenced file is very large
- **THEN** the agent states the file's size and asks whether to copy it
- **AND** copies it only after the user agrees

#### Scenario: User declines

- **WHEN** the user declines
- **THEN** the agent records the reference and its original location without copying the file

### Requirement: Lazy Git LFS setup

Before copying the first binary reference file, the skill SHALL check whether Git LFS is installed and configured to track the wiki's assets, and SHALL configure it if it is not, telling the user what it changed. Text-only captures SHALL NOT trigger any LFS check.

#### Scenario: LFS already configured

- **WHEN** Git LFS is installed and tracks the wiki's assets
- **THEN** the agent copies the file without changing Git configuration

#### Scenario: LFS available but not configured

- **WHEN** Git LFS is installed but does not track the wiki's assets
- **THEN** the agent enables LFS tracking for the wiki's assets before copying the file
- **AND** tells the user which Git files it changed

#### Scenario: LFS not installed

- **WHEN** Git LFS is not installed
- **THEN** the agent does not copy the binary file
- **AND** tells the user how to install Git LFS
- **AND** records the reference and its original location in the wiki

#### Scenario: Not a Git repository

- **WHEN** the project is not a Git repository
- **THEN** the agent copies the file without any LFS setup

#### Scenario: Existing history untouched

- **WHEN** the agent configures LFS
- **THEN** it does not rewrite existing Git history or migrate files already committed

### Requirement: Safe project root

The skill SHALL NOT create `openspec/` as a side effect when the project has no OpenSpec root, and SHALL write the wiki in the root it resolves, including a selected store.

#### Scenario: No OpenSpec root

- **WHEN** the project has no OpenSpec root
- **THEN** the agent writes nothing and tells the user to set the project up first

### Requirement: Capture does not change specs or code

The skill SHALL write only under `openspec/wiki/` and the Git files needed for LFS.

#### Scenario: Capture leaves specs untouched

- **WHEN** capture runs
- **THEN** no file under `openspec/specs/`, `openspec/changes/`, or the project's source is modified
