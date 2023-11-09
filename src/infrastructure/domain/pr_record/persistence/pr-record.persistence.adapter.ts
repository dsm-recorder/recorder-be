import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PRRecordTypeormEntity } from './pr-record.entity';
import { PRRecord } from '../../../../application/domain/pr_record/pr-record';
import { PRRecordPort } from '../../../../application/domain/pr_record/spi/pr-record.spi';
import { InjectRepository } from '@nestjs/typeorm';
import { PrRecordMapper } from './pr-record.mapper';

@Injectable()
export class PRRecordPersistenceAdapter implements PRRecordPort {
    constructor(
        @InjectRepository(PRRecordTypeormEntity)
        private readonly prRecordRepository: Repository<PRRecordTypeormEntity>,
        private readonly prRecordMapper: PrRecordMapper,
    ) {}

    async savePRRecord(prRecord: PRRecord): Promise<void> {
        await this.prRecordRepository.save(await this.prRecordMapper.toEntity(prRecord));
    }
}
