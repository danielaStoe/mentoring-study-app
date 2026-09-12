import { StudyTask } from "../models/StudyTask.js";

export class StudyPlanner {
    constructor() {
        this.tasks = [];
    }

    addTask(title, subject) {
        const task = new StudyTask(title, subject);
        this.tasks.push(task);
        return task;
    }

    findTask(id) {
        return this.tasks.find(task => task.id === id);
    }

    toggleTask(id) {
        const task = this.findTask(id);

        if (!task) {
            throw new Error("Task not found.");
        }

        task.toggleComplete();
    }

    deleteTask(id) {
        const taskExists = this.tasks.some(task => task.id === id);

        if (!taskExists) {
            throw new Error("Task not found.");
        }

        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    getOpenTasks() {
        return this.tasks.filter(task => !task.completed);
    }

    getCompletedTasks() {
        return this.tasks.filter(task => task.completed);
    }
}
