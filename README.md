# Study Planner

A small vanilla JavaScript project for learning software-development fundamentals and practicing a complete Git/GitHub workflow with Claude Code.

## Current features

- Add a study task
- Assign a subject
- Mark a task as completed or open
- Delete a task
- Separate open and completed tasks

The starter version intentionally **does not** include priorities, due dates, persistence, or automated tests. Those are intended to be added through later GitHub issues and pull requests.

## Architecture

```text
src/
├── models/
│   └── StudyTask.js
├── services/
│   └── StudyPlanner.js
├── ui/
│   └── StudyPlannerApp.js
└── main.js
```

### `StudyTask`

Represents one study task and contains behavior belonging to a single task.

### `StudyPlanner`

Manages the collection of tasks and contains operations such as add, find, complete, and delete.

### `StudyPlannerApp`

Connects the application logic to the browser DOM, handles user interaction, and renders the current state.

### `main.js`

Creates the objects and starts the application.

## Run locally

Because the project uses JavaScript modules, serve it through a local web server instead of opening `index.html` directly.

If you use VS Code, the **Live Server** extension is an easy option.

Or, if Python is installed:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## Suggested learning roadmap

### Issue 1 — Add priorities

Add `low`, `medium`, and `high` priorities to study tasks.

### Issue 2 — Add due dates

Allow tasks to optionally have a due date.

### Issue 3 — Add persistence

Store tasks in `localStorage` so they survive a page refresh.

### Issue 4 — Filtering and sorting

Filter by subject/status and sort by priority or due date.

### Later

- Automated tests
- Continuous integration
- Deployment
- Refactoring toward a framework such as React when the UI complexity makes that useful
