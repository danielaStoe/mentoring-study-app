export class StudyPlannerApp {
    constructor(planner) {
        this.planner = planner;

        this.form = document.querySelector("#task-form");
        this.titleInput = document.querySelector("#task-title");
        this.subjectInput = document.querySelector("#task-subject");
        this.formError = document.querySelector("#form-error");

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

        this.render();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.clearError();

        try {
            this.planner.addTask(this.titleInput.value, this.subjectInput.value);
            this.form.reset();
            this.titleInput.focus();
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

        const deleteButton = document.createElement("button");
        deleteButton.className = "icon-button";
        deleteButton.type = "button";
        deleteButton.dataset.action = "delete";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("aria-label", `Delete ${task.title}`);

        item.append(checkbox, taskMain, deleteButton);

        return item;
    }

    showError(message) {
        this.formError.textContent = message;
    }

    clearError() {
        this.formError.textContent = "";
    }
}
