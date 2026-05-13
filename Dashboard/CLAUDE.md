# CLAUDE.md - System Guide

## Build & Test Commands
- Dev Server: `npm run dev`
- Build: `npm run build`
- Type Check: `npm run typecheck`
- Unit Tests: `npm run test:unit`
- E2E Tests: `npm run test:e2e`
- Coverage: `npm run coverage`

## Security Scanners (SAST & SCA)
- **SAST (Static Analysis):** `npm run lint` (ESLint with TypeScript support)
- **SCA (Composition Analysis):** `npm audit` (Identifies dependency vulnerabilities)
- **Secret Detection:** `gitleaks detect --source .` (Requires Gitleaks CLI)

## Conventions
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** React (Functional components with Hooks)
- **Atomic Design:** Follow atomic design principles in `src/components/`
- **Security:**
  - Never commit secrets (validated by Gitleaks)
  - All PRs must pass `npm run lint` and `npm audit`
  - Follow OWASP Top 10 guidelines
  - Comply with Ley 1581 (Colombia) for PII handling
