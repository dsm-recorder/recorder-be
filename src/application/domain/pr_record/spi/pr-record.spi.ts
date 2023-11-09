import { PRRecord } from '../pr-record';

export interface PRRecordPort {
    savePRRecord(prRecord: PRRecord): Promise<void>;
}

export const PRRecordPort = Symbol('IPRRecordPort');
