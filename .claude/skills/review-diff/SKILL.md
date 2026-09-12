---
name: review-diff
description: Reviews the current Git diff in the Study Planner repo against the project's architecture and coding rules before the change is committed or turned into a pull request. It reports scope creep, leftover debugging code, layering mistakes, and unsafe DOM usage, and lists what still needs to be checked by hand in the browser. Use this whenever the user asks to review the diff, review their changes, look over what they changed, check whether a change is ready, or mentions committing, pushing, or opening a pull request - even if they never use the word "review".
---

# Review Diff

This project is a teaching repo. A review here is worth more when it explains *why*
something is a problem than when it just flags it, so write findings the way a patient
reviewer would in a pull request: name the issue, point at the line, say what it costs,
and suggest the smaller fix.

Review only. Do not commit, push, amend, or create a branch as part of this skill, and do
not fix things you find unless the user asks — they may want to make the edits themselves,
which is the point of the exercise.

## 1. Establish what actually changed

Never review from memory or from the conversation so far. Read the real diff:

```bash
git branch --show-current && git status --short && git diff && git diff --staged
```

Untracked files (`??` in the status output) do not appear in `git diff` and are easy to
miss — read any that are part of the change with `cat`.

If the diff looks far larger than the change should be, suspect formatting or line-ending
churn rather than real edits (this repo has `core.autocrlf=true`, so a tool that rewrites
a whole file can restate every line). `git diff --stat` and `git diff -w` help separate
real changes from whitespace noise.

## 2. Review against the project's rules

These come from `CLAUDE.md`. They are the standard the change is being held to.

**Scope** — Does every hunk belong to the task at hand? Unrelated renames, reformatting,
or opportunistic "while I was in here" edits make a change hard to review and hard to
revert, so call them out even when the edit itself is an improvement.

**Leftovers** — `console.log`, commented-out code, `TODO`s, hardcoded test values, stray
files. Search rather than eyeball: `git diff | grep -nE 'console\.|debugger|TODO|FIXME'`.

**Layering** — `src/models` holds domain objects, `src/services` coordinates them,
`src/ui` touches the DOM, and `src/main.js` wires it together. Validation or rules that
drifted into `StudyPlannerApp.js` are the common failure; they belong in the model or the
service, where they can later be tested without a browser.

**Vanilla JS only** — no framework, no new dependency, no build step, unless the user
explicitly asked. A new entry in `package.json` or a CDN `<script>` tag is a finding.

**DOM safety** — user-provided text must go through `textContent` or DOM APIs, never
`innerHTML`. A task title is user input, so `innerHTML` there is an injection bug, not a
style preference.

**Size and shape** — small methods with one clear job. Flag genuinely tangled code, but
resist inventing abstractions for a 200-line app; "avoid unnecessary abstractions" is
itself one of the rules.

**Preserved behavior** — does anything in the diff change add, complete, or delete
behavior that was not meant to change?

## 3. Work out what needs manual verification

There are no automated tests in this project yet, so the change is only as verified as the
browser check behind it. The app uses ES modules and must be served over HTTP — opening
`index.html` from the filesystem fails. `.claude/launch.json` defines a static server for
this.

State plainly whether the change was actually exercised in a browser. If it was not, say
so rather than implying it passed. List the specific things to click, always including the
existing add / complete / delete flows, since those are what a regression would break.

## 4. Report

Use this structure, and keep it short enough to read in one pass:

```markdown
## Scope
One or two lines: what changed, which files, and whether it all belongs to the stated task.

## Findings
Grouped as **Blocking**, **Worth fixing**, and **Nitpick**. Each finding names the file
and line, the problem, why it matters, and the suggested fix. Say "no findings" when
there are none — padding a review with invented concerns trains the wrong instinct.

## Manual verification
What has been checked in the browser, and what still needs checking.

## Ready for a PR?
A direct yes or no, with the one thing standing in the way if it is no.
```

Rank findings by what would actually bite: a real bug outranks a naming preference. If the
diff is clean, say so in a sentence and stop — a short honest review is more useful than a
long one.
