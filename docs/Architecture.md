# Architecture

## Status

This document describes the proposed architecture for GrowBuddy AI. The repository does not yet contain an application implementation, so these decisions should be validated as the MVP is built.

## System Goals

GrowBuddy AI should be:

- Safe and age-appropriate for children
- Simple enough to iterate on quickly during the MVP
- Observable and auditable, especially for AI-generated actions
- Privacy-conscious for child and family data
- Modular enough to add specialized coaching agents over time

## Proposed System Overview

```text
Child Dashboard ─┐
                 ├─> Next.js Web App ─> FastAPI Service ─> SQLite
Parent Dashboard ┘                         │
                                           ├─> OpenAI API
                                           └─> Background Jobs / Reminders
```

### Frontend

A Next.js application will provide separate child and parent experiences. React components and Tailwind CSS will support a responsive, accessible interface.

### Backend

A FastAPI service will own application rules, authentication and authorization, planning, coaching workflows, and access to stored data. API boundaries should prevent the browser from directly accessing AI providers or sensitive records.

### AI Layer

AI features will use the OpenAI API through a server-side orchestration layer. Each request should include only the minimum context needed. Structured outputs, validation, moderation, and deterministic application rules should surround model responses.

### Data Layer

SQLite is suitable for local development and the first MVP. Data access should be isolated behind repositories or service interfaces so PostgreSQL can replace SQLite without changing product behavior.

Likely core entities include:

- Family, parent, and child profiles
- Tasks, routines, and schedules
- Coaching sessions and messages
- Reading and homework activities
- Goals, rewards, and progress events
- Parent insights and notification preferences
- Consent, safety, and audit records

## Suggested Backend Modules

- `identity`: accounts, family membership, roles, and permissions
- `planning`: tasks, routines, schedules, and completion state
- `coaching`: conversations and specialized coach workflows
- `memory`: approved preferences, summaries, and relevant history
- `rewards`: goals, points, streaks, and rewards
- `insights`: parent-facing summaries and progress signals
- `notifications`: reminders, delivery preferences, and quiet hours
- `safety`: consent, content controls, escalation, and audit events

## Multi-Agent Direction

The MVP should begin with one orchestrated coaching flow. Specialized agents may be introduced when their responsibilities and evaluation criteria are clear.

Potential agents are described in [Agents.md](./Agents.md). The orchestrator should route requests, enforce permissions, limit context, and combine results. Agents should not write directly to persistent state without validated application-level commands.

## Security, Privacy, and Safety

Because the product serves children, these requirements are architectural concerns rather than later enhancements:

- Obtain and record appropriate parental consent before collecting child data.
- Enforce family-scoped authorization for every protected resource.
- Minimize collection and retention of personal information.
- Encrypt data in transit and use managed encryption at rest in production.
- Keep secrets and provider credentials on the server.
- Provide deletion, export, and retention controls.
- Log AI actions and safety-relevant events without storing unnecessary sensitive text.
- Define age-appropriate content rules and a human escalation path.
- Review applicable child privacy laws and platform requirements before launch.

## Observability and Evaluation

The system should record request IDs, latency, failures, token usage, model and prompt versions, and validated agent outcomes. AI features need repeatable evaluations covering helpfulness, factuality, age appropriateness, privacy, and refusal behavior.

## Open Decisions

- Authentication provider and account recovery model
- Supported child age range and required consent flow
- Hosting and background-job infrastructure
- Notification channels
- Memory retention and parent visibility rules
- AI model selection, evaluation thresholds, and fallback behavior
- Initial accessibility and localization targets

