import { PrRecordPort } from '../../../../application/domain/pr_record/spi/pr-record.spi';
import { PrRecord } from '../../../../application/domain/pr_record/pr-record';
import { In, Repository } from 'typeorm';
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
                }
            })
        );
    }

    async savePrRecord(prRecord: PrRecord): Promise<void> {
        await this.prRecordRepository.save(
            await this.prRecordMapper.toEntity(prRecord)
        );
    }

    async queryPrRecordsByIdIn(prRecordIds: string[]): Promise<PrRecord[]> {
        const prRecords = await this.prRecordRepository.find({
            where: {
                id: In(prRecordIds)
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

    async saveAllPrRecords(prRecords: PrRecord[]): Promise<void> {
        const entity = await Promise.all(
            prRecords.map(async (prRecord) => {
                return await this.prRecordMapper.toEntity(prRecord)
            })
        );
        await this.prRecordRepository.save(entity);
    }

}
