import { Injectable } from '@nestjs/common';
import { DailyReportTypeormEntity } from './daily-report.entity';
import { DailyReport } from '../../../../application/domain/dailyReport/daily-report';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectTypeormEntity } from '../../project/persistence/project.entity';
import { convert, LocalDate, nativeJs } from 'js-joda';

@Injectable()
export class DailyReportMapper {
    constructor(
        @InjectRepository(ProjectTypeormEntity)
        private readonly dailyReportRepository: Repository<ProjectTypeormEntity>,
    ) {}

    async toDomain(entity: DailyReportTypeormEntity): Promise<DailyReport> {
        return entity ?
            new DailyReport(
                entity.content,
                entity.isComplete,
                LocalDate.from(nativeJs(entity.date)),
                (await entity.project).id,
                entity.id,
            )
            : null;
    }

    async toEntity(domain: DailyReport): Promise<DailyReportTypeormEntity> {
        const project = await this.dailyReportRepository.findOneBy({
            id: domain.projectId,
        });

        return new DailyReportTypeormEntity(
            domain.id,
            domain.content,
            domain.isComplete,
            convert(domain.date).toDate(),
            Promise.resolve(project),
        );
    }
}