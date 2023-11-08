export class PRRecord {
    id?: string;
    projectId: string;
    title: string;
    content: string;
    solution: string;
    type: RecordType;
}

export type RecordType = 'NEW_FEATURE' | 'BUG_FIX' | 'REFACTORING';
