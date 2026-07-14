# Agents

## Purpose

GrowBuddy AI may use specialized AI agents to support distinct coaching tasks. An agent is a bounded capability with a clear role, allowed tools, input contract, output schema, and evaluation suite—not an independent actor with unrestricted access.

## Operating Principles

- Child safety and family permissions override every agent goal.
- Agents receive the minimum context and tools required for a task.
- Application code validates all model output before acting on it.
- Important state changes require explicit user intent and, where appropriate, parental approval.
- Agent behavior is observable, versioned, and evaluated before release.
- Agents acknowledge uncertainty and do not impersonate teachers, therapists, or parents.
- The system should prefer the simplest reliable workflow over unnecessary agent handoffs.

## Proposed Agent Roles

### Orchestrator

Classifies an approved request, selects the appropriate workflow, provides scoped context, and assembles a response. It enforces authorization and safety policy but does not bypass application services.

### Planner Agent

Turns goals, assignments, and routines into manageable steps. It considers available time and preferences while leaving final schedule control with the family.

### Reminder Coach

Creates supportive, concise reminders based on an existing plan. It respects quiet hours, frequency limits, and parent-configured boundaries.

### Reading Coach

Guides reading practice through questions, explanations, and encouragement appropriate to the child's level. It should promote comprehension rather than complete work for the child.

### Homework Coach

Helps a child reason through an assignment using hints, questions, and worked examples. It should avoid simply supplying answers and should recognize when adult or teacher help is needed.

### Insight Agent

Summarizes progress and recurring patterns for parents using traceable product data. It must distinguish observed facts from inference and avoid diagnostic claims.

### Memory Curator

Proposes concise memories that could improve future coaching. Persistent memory should be reviewable, correctable, deletable, and subject to consent and retention rules.

## Agent Request Lifecycle

1. Authenticate the user and authorize access to family data.
2. Classify the request and run safety checks.
3. Select one bounded workflow and retrieve minimal context.
4. Generate a structured response or proposed application command.
5. Validate the output against policy and business rules.
6. Ask for confirmation when an action requires it.
7. Execute through application services and record an audit event.
8. Collect feedback and evaluation signals without unnecessary data retention.

## Tool and Data Boundaries

Agents may read only records authorized for the current family and purpose. They should not have direct database credentials, unrestricted internet access, or the ability to contact third parties. Tools should expose narrow operations such as `list_today_tasks` or `propose_schedule`, with server-side validation.

## Evaluation Requirements

Every agent needs tests for:

- Age-appropriate language and emotional tone
- Helpfulness and task completion quality
- Factuality and transparent uncertainty
- Privacy leakage and cross-family data isolation
- Unsafe, manipulative, or dependency-forming behavior
- Prompt injection and tool misuse
- Correct escalation to a trusted adult
- Latency and cost targets

Release decisions should use both automated evaluations and review by people with relevant product, education, and child-safety expertise.

## MVP Recommendation

Begin with a single orchestrated Planner and Reminder Coach workflow. Add other agents only after the team can show that specialization improves quality, safety, or maintainability.

## Open Questions

- Which actions always require parent approval?
- What information can a child keep private from a parent, and what must be disclosed for safety?
- How should the system respond to distress, abuse, or self-harm signals?
- Which memories expire automatically?
- When should the system involve a teacher or other trusted adult?
- What evidence is required before enabling an agent in production?
