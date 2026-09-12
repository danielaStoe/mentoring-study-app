# Study Planner

This repository is a small vanilla JavaScript study-planning application used for learning software-development fundamentals and practicing a professional Git/GitHub workflow.

## Architecture

- `src/models` contains domain objects.
- `src/services` contains application/domain coordination logic.
- `src/ui` contains browser and DOM interaction.
- `src/main.js` wires the application together and starts it.

## Development rules

- Use vanilla JavaScript.
- Do not introduce a framework unless explicitly requested.
- Do not add dependencies unless explicitly requested.
- Keep domain logic out of the UI layer where practical.
- Prefer small, readable methods with clear responsibilities.
- Preserve existing behavior when implementing new features.
- Keep changes scoped to the current issue.
- Avoid unnecessary abstractions.
- Do not use `innerHTML` for user-provided content; prefer DOM APIs and `textContent`.

## Git workflow

- Work on a feature branch, not directly on `main`.
- Inspect the current branch and diff before making assumptions.
- Do not commit, push, merge, rebase, or delete branches unless explicitly asked.
- Before a pull request, review the diff for unrelated changes and temporary/debugging code.

## Verification

There are currently no automated tests in the starter project.

For behavioral changes:
- run the application locally,
- manually verify the changed behavior,
- verify existing add/complete/delete behavior still works.

Automated testing will be introduced in a later lesson.
