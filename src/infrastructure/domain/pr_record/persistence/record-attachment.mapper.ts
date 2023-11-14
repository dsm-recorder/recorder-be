import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PRRecordTypeormEntity } from './pr-record.entity';
import { Repository } from 'typeorm';
import { RecordAttachment } from '../../../../application/domain/pr_record/record-attachment';
import { RecordAttachmentTypeormEntity } from './record-attachment.entity';

@Injectable()
export class RecordAttachmentMapper {
    constructor(
        @InjectRepository(PRRecordTypeormEntity)
        private readonly prRecordRepository: Repository<PRRecordTypeormEntity>,
    ) {}

    async toDomain(entity: RecordAttachmentTypeormEntity) {
        return entity ? new RecordAttachment(entity.attachmentUrl, entity.prRecord.id) : null;
    }

    async toEntity(domain: RecordAttachment) {
        const prRecord = await this.prRecordRepository.findOneBy({ id: domain.prRecordId });
        return new RecordAttachmentTypeormEntity(domain.attachmentUrl, prRecord);
    }
}
