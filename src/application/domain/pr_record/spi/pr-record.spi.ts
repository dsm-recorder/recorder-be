import { PrRecord } from '../pr-record';
import { RecordAttachment } from '../record-attachment';
import { PublishedPrRecordResponse } from '../dto/pr-record.dto';

export interface PrRecordPort {
    queryPrRecordsByProjectId(projectId: string): Promise<PrRecord[]>;

    queryPrRecordById(prRecordId: string): Promise<PrRecord>;

    savePrRecord(prRecord: PrRecord): Promise<PrRecord>;

    queryPrRecordsByIdIn(prRecordIds: string[]): Promise<PrRecord[]>;

    saveAllPrRecords(prRecords: PrRecord[]): Promise<void>;

    saveAllAttachments(attachments: RecordAttachment[]): Promise<void>;

    queryAttachmentsByPrRecordId(prRecordId: string): Promise<RecordAttachment[]>;

    deleteAllAttachments(attachments: RecordAttachment[]): Promise<void>;

    queryPublishedPrRecordsByProjectId(projectId: string): Promise<PublishedPrRecordResponse[]>;
}

export const PrRecordPort = Symbol('IPrRecordPort');
