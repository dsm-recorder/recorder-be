import { Inject, Injectable } from '@nestjs/common';
import { DailyReportPort } from '../spi/daily-report.spi';
import { QueryTodosResponse, TodoResponse } from '../dto/daily-report.dto';

@Injectable()
export class QueryDailyReportHistoryUseCase {
    constructor(
        @Inject(DailyReportPort)
        private readonly dailyReportPort: DailyReportPort
    ) {}

    async execute(projectId: string): Promise<QueryTodosResponse> {
        const dailyReports = await this.dailyReportPort.queryDailyReportsByProjectId(projectId);

        return {
            todos: dailyReports.map((dailyReport): TodoResponse => {
                return {
                    content: dailyReport.content,
                    complete: dailyReport.isComplete,
                    date: dailyReport.date
                };
            })
        };
    }
}