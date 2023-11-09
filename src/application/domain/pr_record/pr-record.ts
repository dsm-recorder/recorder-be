import { LocalDate } from 'js-joda';

export class PrRecord {
    id?: string;
    title: string;
    projectId: string;
    content: string;
    importance: number;
    solution?: string;
    type: RecordType;
    date?: LocalDate;


    constructor(title: string, projectId: string, content: string, importance: number, type: RecordType, solution?: string, date?: LocalDate, id?: string) {
        this.id = id;
        this.title = title;
        this.projectId = projectId;
        this.content = content;
        this.importance = importance;
        this.solution = solution;
        this.type = type;
        this.date = date;
    }

    public update(title: string, content: string, importance: number, type: RecordType, solution?: string) {
        this.title = title;
        this.content = content;
        this.importance = importance;
        this.type = type;
        this.solution = solution;
    }
}

export type RecordType = 'NEW_FEATURE' | 'BUG_FIX' | 'REFACTORING';
