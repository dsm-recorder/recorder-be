import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DailyReportTypeormEntity } from '../../domain/dailyReport/persistence/daily-report.entity';
import { DailyReportPersistenceAdapter } from '../../domain/dailyReport/persistence/daily-report.persistence.adapter';
import { DailyReportPort } from '../../../application/domain/dailyReport/spi/daily-report.spi';
import { DailyReportMapper } from '../../domain/dailyReport/persistence/daily-report.mapper';
import { QueryDailyTodosUseCase } from '../../../application/domain/dailyReport/usecase/query-daily-todos.usecase';
import { DailyReportWebAdapter } from '../../domain/dailyReport/presentation/daily-report.web.adapter';
import { ProjectModule } from './project.module';
import { CreateTodoUseCase } from '../../../application/domain/dailyReport/usecase/create-todo.usecase';
import { ChangeTodoStatusUseCase } from '../../../application/domain/dailyReport/usecase/change-todo-status.usecase';
import { DeleteTodoUseCase } from '../../../application/domain/dailyReport/usecase/delete-todo.usecase';
import {
    QueryDailyReportHistoryUseCase
} from '../../../application/domain/dailyReport/usecase/query-daily-report-history.usecase';

const DAILY_REPORT_PORT = { provide: DailyReportPort, useClass: DailyReportPersistenceAdapter };
const DAILY_REPORT_REPOSITORY = TypeOrmModule.forFeature([DailyReportTypeormEntity]);

@Module({
    imports: [DAILY_REPORT_REPOSITORY, ProjectModule],
    providers: [
        DAILY_REPORT_PORT,
        DailyReportMapper,
        QueryDailyTodosUseCase,
        CreateTodoUseCase,
        ChangeTodoStatusUseCase,
        DeleteTodoUseCase,
        QueryDailyReportHistoryUseCase
    ],
    exports: [DAILY_REPORT_PORT, DAILY_REPORT_REPOSITORY],
    controllers: [DailyReportWebAdapter]
})
export class DailyReportModule {}