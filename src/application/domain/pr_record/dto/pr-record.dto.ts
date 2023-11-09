import { RecordType } from '../pr-record';

export class CreatePRRecordRequest {
    title: string;
    content: string;
    solution: string;
    type: RecordType;
}
