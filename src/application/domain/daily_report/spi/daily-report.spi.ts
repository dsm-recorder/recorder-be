import { DailyReport } from '../daily-report';
import { LocalDate } from 'js-joda';

export interface DailyReportPort {
    queryDailyReportsByDateAndProjectId(date: LocalDate, projectId: string): Promise<DailyReport[]>;

    saveDailyReport(dailyReport: DailyReport): Promise<void>;

    queryDailyReportById(dailyReportId: string): Promise<DailyReport>;

    deleteDailyReport(dailyReportId: string): Promise<void>;

    queryDailyReportsByProjectId(projectId: string): Promise<DailyReport[]>;
}

export const DailyReportPort = Symbol('IDailyReportPort');