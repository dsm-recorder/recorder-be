import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { PRRecordTypeormEntity } from './pr-record.entity';

@Entity('tbl_record_attachment')
export class RecordAttachmentTypeormEntity {
    @PrimaryColumn('varchar', { length: 255, nullable: false })
    attachmentUrl: string;

    @ManyToOne(() => PRRecordTypeormEntity, (prRecord) => prRecord.recordAttachments, {
        onDelete: 'CASCADE',
    })
    @PrimaryColumn('varchar', { name: 'pr_record_id' })
    prRecord: PRRecordTypeormEntity;

    constructor(attachmentUrl: string, prRecord: PRRecordTypeormEntity) {
        this.attachmentUrl = attachmentUrl;
        this.prRecord = prRecord;
    }
}
