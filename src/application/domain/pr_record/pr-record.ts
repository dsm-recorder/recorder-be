import { LocalDate } from 'js-joda';

export class PrRecord {
    id?: string;
    title: string;
    projectId: string;
    content: string;
    importance: number;
    solution?: string;
    isPublished: boolean;
    type: RecordType;
    createdAt?: LocalDate;


    constructor(title: string, projectId: string, content: string, importance: number,
                isPublished: boolean, type: RecordType, solution?: string, id?: string, createdAt?: LocalDate) {
        this.title = title;
        this.projectId = projectId;
        this.content = content;
        this.importance = importance;
        this.solution = solution;
        this.isPublished = isPublished;
        this.type = type;
        this.id = id;
        this.createdAt = createdAt;
    }

    public update(title: string, content: string, importance: number, type: RecordType, solution?: string) {
        this.title = title;
        this.content = content;
        this.importance = importance;
        this.type = type;
        this.solution = solution;
    }

    public publish() {
        this.isPublished = true
    }
}

export type RecordType = 'NEW_FEATURE' | 'BUG_FIX' | 'REFACTORING';
