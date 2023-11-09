import { Injectable } from '@nestjs/common';
import { ProjectTypeormEntity } from '../../project/persistence/project.entity';
import { PRRecordTypeormEntity } from './pr-record.entity';
import { PRRecord } from '../../../../application/domain/pr_record/pr-record';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { convert, LocalDate, nativeJs } from 'js-joda';

@Injectable()
export class PrRecordMapper {
    constructor(
        @InjectRepository(ProjectTypeormEntity)
        private readonly dailyReportRepository: Repository<ProjectTypeormEntity>
    ) {}

    async toDomain(entity: PRRecordTypeormEntity): Promise<PRRecord> {
        return entity ?
            new PRRecord(
                entity.title,
                (await entity.project).id,
                entity.content,
                entity.importance,
                entity.type,
                LocalDate.from(nativeJs(entity.createdAt)),
                entity.id,
                entity.solution
            )
            : null;
    }

    async toEntity(domain: PRRecord): Promise<PRRecordTypeormEntity> {
        const project = await this.dailyReportRepository.findOneBy({
            id: domain.projectId
        });

        return new PRRecordTypeormEntity(
            domain.title,
            Promise.resolve(project),
            domain.content,
            domain.importance,
            domain.type,
            convert(domain.date).toDate(),
            domain.id,
            domain.solution
        );
    }
}
