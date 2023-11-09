import { LocalDate } from 'js-joda';

export class PRRecord {
    id?: string;
    title: string;
    projectId: string;
    content: string;
    importance: number;
    solution?: string;
    type: RecordType;
    date: LocalDate;


    constructor(title: string, projectId: string, content: string, importance: number, type: RecordType, date: LocalDate, id?: string, solution?: string) {
        this.id = id;
        this.title = title;
        this.projectId = projectId;
        this.content = content;
        this.importance = importance;
        this.solution = solution;
        this.type = type;
        this.date = date;
    }
}

export type RecordType = 'NEW_FEATURE' | 'BUG_FIX' | 'REFACTORING';
