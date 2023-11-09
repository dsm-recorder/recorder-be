import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DailyReportPort } from '../spi/daily-report.spi';

@Injectable()
export class DeleteTodoUseCase {
    constructor(
        @Inject(DailyReportPort)
        private readonly dailyReportPort: DailyReportPort
    ) {}

    async execute(dailyReportId: string): Promise<void> {
        const dailyReport = await this.dailyReportPort.queryDailyReportById(dailyReportId);
        if (!dailyReport) {
            throw new NotFoundException('Daily Report Not Found');
        }

        await this.dailyReportPort.deleteDailyReport(dailyReport.id);
    }
}