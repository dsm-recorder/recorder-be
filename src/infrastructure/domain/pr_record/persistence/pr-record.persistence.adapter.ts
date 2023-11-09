import { PrRecordPort } from '../../../../application/domain/pr_record/spi/pr-record.spi';
import { PrRecord } from '../../../../application/domain/pr_record/pr-record';
import { Repository } from 'typeorm';
import { PRRecordTypeormEntity } from './pr-record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PrRecordMapper } from './pr-record.mapper';

export class PrRecordPersistenceAdapter implements PrRecordPort {
    constructor(
        @InjectRepository(PRRecordTypeormEntity)
        private readonly prRecordRepository: Repository<PRRecordTypeormEntity>,
        private readonly prRecordMapper: PrRecordMapper
    ) {}

    async queryPrRecordsByProjectId(projectId: string): Promise<PrRecord[]> {
        const prRecords = await this.prRecordRepository.find({
            where: {
                project: {
                    id: projectId
                }
            },
            order: {
                createdAt: 'desc'
            },
            relations: {
                project: true
            }
        });

        return Promise.all(
            prRecords.map(async (prRecord) => {
                return await this.prRecordMapper.toDomain(prRecord);
            })
        );
    }

    async queryPrRecordById(prRecordId: string): Promise<PrRecord> {
        return await this.prRecordMapper.toDomain(
            await this.prRecordRepository.findOne({
                where: {
                    id: prRecordId
                },
                relations: {
                    project: true
                }
            })
        );
    }

    async savePrRecord(prRecord: PrRecord): Promise<void> {
        await this.prRecordRepository.save(
            await this.prRecordMapper.toEntity(prRecord)
        );
    }

}
