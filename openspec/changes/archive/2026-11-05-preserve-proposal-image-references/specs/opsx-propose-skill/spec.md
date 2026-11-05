# Spec Delta

## Purpose

Defines how the proposal workflow preserves user-provided visual references as durable context for a change.

## ADDED Requirements

### Requirement: Proposal workflows preserve relevant visual references

The proposal-generating workflows SHALL preserve user-provided image attachments that materially inform a change within that change and link to them from a relevant proposal artifact.

#### Scenario: An attached image informs Propose or Fast Forward

- **WHEN** a user supplies an image attachment that informs a change created through `/opsx:propose` or `/opsx:ff`
- **THEN** the agent copies the image into a references directory under the change root
- **AND** links to the copy from the proposal or design artifact using a repository-relative path
- **AND** describes the design decision or requirement that the image informed

#### Scenario: A proposal reference uses a portable path

- **WHEN** the proposal links to an image copied into the change
- **THEN** the link resolves from the artifact on Windows, macOS, and Linux

### Requirement: Proposal reports images it cannot preserve

The `/opsx:propose` workflow SHALL tell the user when it cannot persist a relevant image attachment and SHALL NOT claim that an image is preserved unless a usable copy and link exist.

#### Scenario: An attachment cannot be copied

- **WHEN** an image attachment that informs the proposal is unavailable for copying
- **THEN** the agent identifies the affected reference and asks the user to provide an accessible file or choose to omit it
- **AND** the proposal contains no broken link or claim that the image was preserved

#### Scenario: The user chooses to omit an unavailable image

- **WHEN** the user chooses not to provide an accessible copy of a reference image
- **THEN** the proposal workflow continues without that image
- **AND** the final summary reports that the image was not preserved
