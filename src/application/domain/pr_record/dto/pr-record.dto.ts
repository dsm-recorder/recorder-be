import { RecordType } from '../pr-record';
import { LocalDate } from 'js-joda';

export class QueryProjectPrRecordsResponse {
    prRecords: PrRecordResponse[];
}

export class PrRecordResponse {
    id: string;
    title: string;
    importance: number;
    type: RecordType;
    date: LocalDate;
}

export class QueryPrRecordDetailsResponse {
    title: string;
    type: RecordType;
    content: string;
    solution: string;
    attachmentUrls: string[];
}
