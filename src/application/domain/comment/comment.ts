
export class Comment {
    id: string;
    content: string;
    userId: string;
    projectId: string;


    constructor(content: string, userId: string, projectId: string, id?: string) {
        this.id = id;
        this.content = content;
        this.userId = userId;
        this.projectId = projectId;
    }
}