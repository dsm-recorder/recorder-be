import { LocalDate } from 'js-joda';

export class Comment {

    id: string;
    content: string;
    userId: string;
    projectId: string;
    createdAt?: LocalDate;


    constructor(content: string, userId: string, projectId: string, id?: string, createdAt?: LocalDate) {
        this.id = id;
        this.content = content;
        this.userId = userId;
        this.projectId = projectId;
        this.createdAt = createdAt;
    }
}