# Study Planner

A small study planner with a vanilla JavaScript browser interface, a Python Flask API, and MongoDB storage.

## Current features

- Add a study task
- Assign a subject
- Mark a task as completed or open
- Delete a task
- Separate open and completed tasks
- Store tasks in MongoDB so they survive refreshes

The app does not include priorities, due dates, user accounts, or automated tests yet.

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
app.py
requirements.txt
```

### `StudyTask`

Represents one study task and contains behavior belonging to a single task.

### `StudyPlanner`

Manages the collection of tasks and contains operations such as add, find, complete, and delete.

### `StudyPlannerApp`

Connects the application logic to the browser DOM, handles user interaction, and renders the current state.

### `main.js`

Creates the objects and starts the application.

### `app.py`

Serves the browser app and provides the task API backed by the MongoDB `mentor_study_app` database.

## Run locally

Create and activate a Python virtual environment, then install the backend dependencies:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

On Windows, activate the environment with `.venv\\Scripts\\activate` instead. Copy `.env.example` to `.env` and replace the `MONGODB_URI` placeholders with the connection string from MongoDB Atlas. Keep `.env` private; it is ignored by Git.

```bash
python app.py
```

Open the app at:

```text
http://localhost:5500
```

In Atlas, make sure your IP address is allowed under Network Access and that the database user in the connection string has permission to read and write the database.

## Suggested learning roadmap

### Issue 1 — Add priorities

Add `low`, `medium`, and `high` priorities to study tasks.

### Issue 2 — Add due dates

Allow tasks to optionally have a due date.

### Next — Filtering and sorting

Filter by subject/status and sort by priority or due date.

### Later

- Automated tests
- Continuous integration
- Deployment
- Refactoring toward a framework such as React when the UI complexity makes that useful
"# mentoring-study-app" 
