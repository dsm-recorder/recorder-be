import { RecordType } from '../../../../application/domain/pr_record/pr-record';

export class UpdatePrRecordRequest {
    title: string;
    content: string;
    importance: number;
    solution?: string;
    type: RecordType;
}

export class CreatePRRecordRequest {
    title: string;
    content: string;
    importance: number;
    solution?: string;
    type: RecordType;
    attachmentUrls: string[];
}
