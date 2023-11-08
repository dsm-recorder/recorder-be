import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DailyReportPort } from '../spi/daily-report.spi';
import { CreateTodoRequest } from '../../../../infrastructure/domain/dailyReport/presentation/dto/daily-report.web.dto';
import { DailyReport } from '../daily-report';
import { LocalDate } from 'js-joda';
import { ProjectPort } from '../../project/spi/project.spi';

@Injectable()
export class CreateTodoUseCase {

    constructor(
        @Inject(DailyReportPort)
        private readonly dailyReportPort: DailyReportPort,
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort
    ) {}

    async execute(request: CreateTodoRequest, projectId: string): Promise<void> {
        const project = await this.projectPort.queryProjectById(projectId);
        if (!project) {
            throw new NotFoundException('Project Not Found');
        }
        await this.dailyReportPort.saveDailyReport(
            new DailyReport(
                request.content,
                false,
                LocalDate.now(),
                projectId
            )
        );
    }
}