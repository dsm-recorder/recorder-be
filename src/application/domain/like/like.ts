export class Like {
    projectId: string;
    userId: string;

    constructor(projectId: string, userId: string) {
        this.projectId = projectId;
        this.userId = userId;
    }
}
