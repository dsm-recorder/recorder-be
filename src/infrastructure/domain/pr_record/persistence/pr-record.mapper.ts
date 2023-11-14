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
        private readonly dailyReportRepository: Repository<ProjectTypeormEntity>,
    ) {}

    async toDomain(entity: PRRecordTypeormEntity): Promise<PrRecord> {
        return entity
            ? new PrRecord(
                  entity.title,
                  entity.project.id,
                  entity.content,
                  entity.importance,
                  entity.isPublished,
                  entity.type,
                  entity.solution,
                  entity.id,
                  LocalDate.from(nativeJs(entity.createdAt)),
              )
            : null;
    }

    async toEntity(domain: PrRecord): Promise<PRRecordTypeormEntity> {
        const project = await this.dailyReportRepository.findOneBy({
            id: domain.projectId,
        });

        return new PRRecordTypeormEntity(
            project,
            domain.title,
            domain.content,
            domain.importance,
            domain.isPublished,
            domain.type,
            domain.solution,
            domain.id,
        );
    }
}
