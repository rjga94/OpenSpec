# Spec Delta

## ADDED Requirements

### Requirement: Project knowledge is traceable

Wiki pages SHALL identify repository evidence for material claims about project behavior, architecture, and design using repository-relative references that resolve on Windows, macOS, and Linux, and SHALL distinguish current implementation from planned or historical intent.

#### Scenario: Current implementation is documented

- **WHEN** a wiki page records a material fact about current project behavior or structure
- **THEN** it links to or names the relevant repository documentation, configuration, OpenSpec artifact, or source file

#### Scenario: Historical decision is documented

- **WHEN** a wiki page records a decision from a proposal, design, or archived change
- **THEN** it identifies that information as planned or historical rather than current implementation unless current evidence confirms it

#### Scenario: Evidence conflicts

- **WHEN** relevant project evidence conflicts and the current state cannot be established
- **THEN** the wiki preserves the distinction and reports the unresolved conflict instead of presenting an unsupported conclusion

#### Scenario: Repository evidence links are portable

- **WHEN** a wiki page links to evidence inside the repository
- **THEN** the link uses repository-relative semantics and resolves on Windows, macOS, and Linux
