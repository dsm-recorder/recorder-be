import { RecordType } from '../pr-record';

export class CreatePRRecordRequest {
    title: string;
    content: string;
    importance: number;
    solution?: string;
    type: RecordType;
}
