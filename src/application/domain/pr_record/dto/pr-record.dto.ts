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

export class QueryPublishedProjectsResponse {
    projects: PublishedProjectResponse[]
}

export class PublishedProjectResponse {
    id: string;
    name: string;
    startDate: string;
    finishDate: string;
    userProfileUrl: string;
    userAccountId: string;
    likeCount: number;
}