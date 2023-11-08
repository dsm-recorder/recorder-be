import { RecordType } from '../pr-record';

export class CreatePRRecordRequest {
    projectId: string;
    title: string;
    content: string;
    solution: string;
    type: RecordType;
}
