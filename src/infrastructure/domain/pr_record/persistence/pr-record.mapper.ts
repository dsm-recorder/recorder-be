import { Injectable } from '@nestjs/common';
import { ProjectTypeormEntity } from '../../project/persistence/project.entity';
import { PRRecordTypeormEntity } from './pr-record.entity';
import { PrRecord } from '../../../../application/domain/pr_record/pr-record';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { convert, LocalDate, nativeJs } from 'js-joda';

@Injectable()
export class PrRecordMapper {
    constructor(
        @InjectRepository(ProjectTypeormEntity)
        private readonly dailyReportRepository: Repository<ProjectTypeormEntity>
    ) {}

    async toDomain(entity: PRRecordTypeormEntity): Promise<PrRecord> {
        return entity ?
            new PrRecord(
                entity.title,
                (await entity.project).id,
                entity.content,
                entity.importance,
                entity.type,
                entity.solution,
                LocalDate.from(nativeJs(entity.createdAt)),
                entity.id
            )
            : null;
    }

    async toEntity(domain: PrRecord): Promise<PRRecordTypeormEntity> {
        const project = await this.dailyReportRepository.findOneBy({
            id: domain.projectId
        });

        return new PRRecordTypeormEntity(
            domain.title,
            Promise.resolve(project),
            domain.content,
            domain.importance,
            domain.type,
            domain.id,
            domain.solution
        );
    }
}
