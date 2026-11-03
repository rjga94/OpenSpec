# Spec Delta

## MODIFIED Requirements

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

### Requirement: Reference material is preserved

The skill SHALL preserve reference files and links relied on by the conversation or relevant project evidence, recording their source and capture date in the wiki.

#### Scenario: Referenced file

- **WHEN** the conversation or a relevant project artifact refers to an image, video, audio file, PDF, Word document, or other file that supports captured knowledge
- **THEN** the agent copies the file under the wiki's assets when accessible
- **AND** the page that uses it links to the copy and records the original source and capture date
- **AND** repository-relative asset links resolve on Windows, macOS, and Linux

#### Scenario: Referenced link

- **WHEN** the conversation or a relevant project artifact relies on a web link
- **THEN** the agent records the link, its title, and the date in the relevant page

#### Scenario: File cannot be copied

- **WHEN** a referenced file is not accessible to the agent
- **THEN** the agent records the reference and its original location
- **AND** tells the user it was not copied

## ADDED Requirements

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
