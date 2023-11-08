import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DailyReportPort } from '../spi/daily-report.spi';
import { LocalDate } from 'js-joda';

@Injectable()
export class ChangeTodoStatusUseCase {
    constructor(
        @Inject(DailyReportPort)
        private readonly dailyReportPort: DailyReportPort,
    ) {}

    async execute(dailyReportId: string): Promise<void> {
        const dailyReport = await this.dailyReportPort.queryDailyReportById(dailyReportId);
        if (!dailyReport) {
            throw new NotFoundException('Daily Report NotFound');
        }

        if (LocalDate.now().isAfter(dailyReport.date)) {
            throw new ForbiddenException('Out of Date');
        }

        dailyReport.toggleCompleteStatus();
        await this.dailyReportPort.saveDailyReport(dailyReport);
    }
}