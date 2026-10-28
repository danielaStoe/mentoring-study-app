export class StudyTask {
    constructor(title, subject, options = {}) {
        const cleanTitle = typeof title === "string" ? title.trim() : "";
        const cleanSubject = typeof subject === "string" ? subject.trim() : "";

        if (!cleanTitle) {
            throw new Error("A study task needs a title.");
        }

        if (!cleanSubject) {
            throw new Error("Please choose a subject.");
        }

        this.id = options.id || crypto.randomUUID();
        this.title = cleanTitle;
        this.subject = cleanSubject;
        this.completed = Boolean(options.completed);
    }

    update(title, subject) {
        const cleanTitle = typeof title === "string" ? title.trim() : "";
        const cleanSubject = typeof subject === "string" ? subject.trim() : "";

        if (!cleanTitle) {
            throw new Error("A study task needs a title.");
        }

        if (!cleanSubject) {
            throw new Error("Please choose a subject.");
        }

        this.title = cleanTitle;
        this.subject = cleanSubject;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}
