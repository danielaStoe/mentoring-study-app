import { StudyTask } from "../models/StudyTask.js";

export class StudyPlanner {
    constructor(storageKey = "study-planner.tasks") {
        this.storageKey = storageKey;
        this.tasks = this.loadTasks();
    }

    loadTasks() {
        try {
            const savedTasks = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
            return savedTasks.map(task => new StudyTask(task.title, task.subject, {
                id: task.id,
                completed: task.completed
            }));
        } catch {
            return [];
        }
    }

    saveTasks() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }

    addTask(title, subject) {
        const task = new StudyTask(title, subject);
        this.tasks.push(task);
        this.saveTasks();
        return task;
    }

    findTask(id) {
        return this.tasks.find(task => task.id === id);
    }

    updateTask(id, title, subject) {
        const task = this.findTask(id);

        if (!task) {
            throw new Error("Task not found.");
        }

        task.update(title, subject);
        this.saveTasks();
        return task;
    }

    toggleTask(id) {
        const task = this.findTask(id);

        if (!task) {
            throw new Error("Task not found.");
        }

        task.toggleComplete();
        this.saveTasks();
    }

    deleteTask(id) {
        const taskExists = this.tasks.some(task => task.id === id);

        if (!taskExists) {
            throw new Error("Task not found.");
        }

        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    getOpenTasks() {
        return this.tasks.filter(task => !task.completed);
    }

    getCompletedTasks() {
        return this.tasks.filter(task => task.completed);
    }
}
