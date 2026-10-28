export class StudyPlannerApp {
    constructor(planner) {
        this.planner = planner;

        this.form = document.querySelector("#task-form");
        this.titleInput = document.querySelector("#task-title");
        this.subjectInput = document.querySelector("#task-subject");
        this.formError = document.querySelector("#form-error");
        this.formHeading = document.querySelector("#add-task-heading");
        this.submitButton = this.form.querySelector("button[type='submit']");
        this.cancelButton = document.querySelector("#cancel-edit-button");
        this.editingTaskId = null;

        this.openTaskList = document.querySelector("#open-task-list");
        this.completedTaskList = document.querySelector("#completed-task-list");

        this.openCount = document.querySelector("#open-count");
        this.completedCount = document.querySelector("#completed-count");

        this.openEmptyState = document.querySelector("#open-empty-state");
        this.completedEmptyState = document.querySelector("#completed-empty-state");
    }

    start() {
        this.form.addEventListener("submit", event => this.handleSubmit(event));
        this.openTaskList.addEventListener("click", event => this.handleTaskAction(event));
        this.completedTaskList.addEventListener("click", event => this.handleTaskAction(event));
        this.cancelButton.addEventListener("click", () => this.stopEditing());

        this.render();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.clearError();

        try {
            if (this.editingTaskId) {
                this.planner.updateTask(this.editingTaskId, this.titleInput.value, this.subjectInput.value);
                this.stopEditing();
            } else {
                this.planner.addTask(this.titleInput.value, this.subjectInput.value);
                this.form.reset();
                this.titleInput.focus();
            }
            this.render();
        } catch (error) {
            this.showError(error.message);
        }
    }

    handleTaskAction(event) {
        const taskCard = event.target.closest("[data-task-id]");

        if (!taskCard) {
            return;
        }

        const taskId = taskCard.dataset.taskId;

        try {
            if (event.target.matches("[data-action='toggle']")) {
                this.planner.toggleTask(taskId);
            }

            if (event.target.matches("[data-action='edit']")) {
                this.startEditing(taskId);
            }

            if (event.target.matches("[data-action='delete']")) {
                this.planner.deleteTask(taskId);
            }

            this.render();
        } catch (error) {
            this.showError(error.message);
        }
    }

    render() {
        const openTasks = this.planner.getOpenTasks();
        const completedTasks = this.planner.getCompletedTasks();

        this.renderTaskList(this.openTaskList, openTasks);
        this.renderTaskList(this.completedTaskList, completedTasks);

        this.openCount.textContent = openTasks.length;
        this.completedCount.textContent = completedTasks.length;

        this.openEmptyState.hidden = openTasks.length > 0;
        this.completedEmptyState.hidden = completedTasks.length > 0;
    }

    renderTaskList(container, tasks) {
        container.replaceChildren(...tasks.map(task => this.createTaskElement(task)));
    }

    createTaskElement(task) {
        const item = document.createElement("li");
        item.className = "task-card";
        item.dataset.taskId = task.id;

        if (task.completed) {
            item.classList.add("is-completed");
        }

        const checkbox = document.createElement("input");
        checkbox.className = "task-toggle";
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.dataset.action = "toggle";
        checkbox.setAttribute("aria-label", `Mark ${task.title} as ${task.completed ? "open" : "completed"}`);

        const taskMain = document.createElement("div");
        taskMain.className = "task-main";

        const title = document.createElement("p");
        title.className = "task-title";
        title.textContent = task.title;

        const subject = document.createElement("p");
        subject.className = "task-subject";
        subject.textContent = task.subject;

        taskMain.append(title, subject);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const editButton = document.createElement("button");
        editButton.className = "icon-button";
        editButton.type = "button";
        editButton.dataset.action = "edit";
        editButton.textContent = "Edit";
        editButton.setAttribute("aria-label", `Edit ${task.title}`);

        const deleteButton = document.createElement("button");
        deleteButton.className = "icon-button delete-button";
        deleteButton.type = "button";
        deleteButton.dataset.action = "delete";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("aria-label", `Delete ${task.title}`);

        actions.append(editButton, deleteButton);
        item.append(checkbox, taskMain, actions);

        return item;
    }

    startEditing(taskId) {
        const task = this.planner.findTask(taskId);

        if (!task) {
            return;
        }

        this.editingTaskId = taskId;
        this.titleInput.value = task.title;
        this.subjectInput.value = task.subject;
        this.formHeading.textContent = "Edit study task";
        this.submitButton.textContent = "Save changes";
        this.cancelButton.hidden = false;
        this.clearError();
        this.titleInput.focus();
    }

    stopEditing() {
        this.editingTaskId = null;
        this.form.reset();
        this.formHeading.textContent = "Add a study task";
        this.submitButton.textContent = "Add task";
        this.cancelButton.hidden = true;
        this.clearError();
        this.render();
    }

    showError(message) {
        this.formError.textContent = message;
    }

    clearError() {
        this.formError.textContent = "";
    }
}
