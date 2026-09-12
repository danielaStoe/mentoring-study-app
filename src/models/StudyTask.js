export class StudyTask {
    constructor(title, subject) {
        const cleanTitle = title.trim();
        const cleanSubject = subject.trim();

        if (!cleanTitle) {
            throw new Error("A study task needs a title.");
        }

        if (!cleanSubject) {
            throw new Error("Please choose a subject.");
        }

        this.id = crypto.randomUUID();
        this.title = cleanTitle;
        this.subject = cleanSubject;
        this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}
