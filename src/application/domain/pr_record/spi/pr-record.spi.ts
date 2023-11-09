import { PrRecord } from '../pr-record';

export interface PrRecordPort {
    queryPrRecordsByProjectId(projectId: string): Promise<PrRecord[]>;

    queryPrRecordById(prRecordId: string): Promise<PrRecord>;

    savePrRecord(prRecord: PrRecord): Promise<void>;
}

export const PrRecordPort = Symbol('IPrRecordPort');