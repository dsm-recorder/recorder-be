import { PrRecordPort } from '../../../../application/domain/pr_record/spi/pr-record.spi';
import { PrRecord } from '../../../../application/domain/pr_record/pr-record';
import { In, Repository } from 'typeorm';
import { PRRecordTypeormEntity } from './pr-record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PrRecordMapper } from './pr-record.mapper';
import { RecordAttachment } from '../../../../application/domain/pr_record/record-attachment';
import { RecordAttachmentMapper } from './record-attachment.mapper';
import { RecordAttachmentTypeormEntity } from './record-attachment.entity';
import { PublishedPrRecordResponse } from '../../../../application/domain/pr_record/dto/pr-record.dto';

export class PrRecordPersistenceAdapter implements PrRecordPort {
    constructor(
        @InjectRepository(PRRecordTypeormEntity)
        private readonly prRecordRepository: Repository<PRRecordTypeormEntity>,
        @InjectRepository(RecordAttachmentTypeormEntity)
        private readonly recordAttachmentRepository: Repository<RecordAttachmentTypeormEntity>,
        private readonly prRecordMapper: PrRecordMapper,
        private readonly recordAttachmentMapper: RecordAttachmentMapper
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

    async savePrRecord(prRecord: PrRecord): Promise<PrRecord> {
        return this.prRecordMapper.toDomain(
            await this.prRecordRepository.save(await this.prRecordMapper.toEntity(prRecord))
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
                return await this.prRecordMapper.toEntity(prRecord);
            })
        );
        await this.prRecordRepository.save(entity);
    }

    async saveAllAttachments(attachments: RecordAttachment[]): Promise<void> {
        const entities = await Promise.all(
            attachments?.map(async (attachment) => {
                return await this.recordAttachmentMapper.toEntity(attachment);
            })
        );
        await this.recordAttachmentRepository.save(entities);
    }

    async queryAttachmentsByPrRecordId(prRecordId: string): Promise<RecordAttachment[]> {
        const entities = await this.recordAttachmentRepository
            .createQueryBuilder('attachment')
            .innerJoin('attachment.prRecord', 'prRecord')
            .where('attachment.prRecord = :prRecordId', { prRecordId: prRecordId })
            .getMany();

        return Promise.all(
            entities.map(async (attachment) => {
                return await this.recordAttachmentMapper.toDomain(attachment);
            })
        );
    }

    async queryPublishedPrRecordsByProjectId(projectId: string): Promise<PublishedPrRecordResponse[]> {
        const prRecords = await this.prRecordRepository.createQueryBuilder('pr')
            .select([
                'pr.id as id',
                'pr.title as title',
                'pr.type as type',
                'pr.content as content',
                'pr.solution as solution',
                'ra.attachmentUrl as attachmentUrls'
            ])
            .leftJoin('tbl_record_attachment', 'ra', 'pr.pr_record_id = ra.pr_record_id')
            .where('pr.project_id = :projectId and pr.isPublished = :isPublished')
            .setParameters({ projectId, isPublished: true })
            .getRawMany();

        const transformed = new Map<string, PublishedPrRecordResponse>();
        for (const prRecord of prRecords) {
            if (transformed.has(prRecord.id)) {
                transformed.get(prRecord.id).attachmentUrls.push(prRecord.attachmentUrls);
            } else {
                prRecord.attachmentUrls = [prRecord.attachmentUrls]
                transformed.set(prRecord.id, prRecord);
            }
        }

        return [...transformed.values()];
    }

    async deleteAllAttachmentsByPrRecordId(prRecordId: string): Promise<void> {
        await this.recordAttachmentRepository.createQueryBuilder('ra')
            .delete()
            .where('pr_record_id = :prRecordId', { prRecordId })
            .execute()
    }
}
