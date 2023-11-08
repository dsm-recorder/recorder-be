import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { QueryDailyTodosUseCase } from '../../../../application/domain/dailyReport/usecase/query-daily-todos.usecase';
import { QueryTodosResponse } from '../../../../application/domain/dailyReport/dto/daily-report.dto';
import { CreateTodoUseCase } from '../../../../application/domain/dailyReport/usecase/create-todo.usecase';
import { CreateTodoRequest } from './dto/daily-report.web.dto';
import { ChangeTodoStatusUseCase } from '../../../../application/domain/dailyReport/usecase/change-todo-status.usecase';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';
import { DeleteTodoUseCase } from '../../../../application/domain/dailyReport/usecase/delete-todo.usecase';
import {
    QueryDailyReportHistoryUseCase,
} from '../../../../application/domain/dailyReport/usecase/query-daily-report-history.usecase';

@Controller('daily-reports')
export class DailyReportWebAdapter {
    constructor(
        private readonly queryDailyTodosUseCase: QueryDailyTodosUseCase,
        private readonly createTodoService: CreateTodoUseCase,
        private readonly changeTodoStatusUseCase: ChangeTodoStatusUseCase,
        private readonly deleteTodoUseCase: DeleteTodoUseCase,
        private readonly queryDailyReportHistoryUseCase: QueryDailyReportHistoryUseCase,
    ) {}

    @Permission([Authority.USER])
    @HttpCode(201)
    @Post(':projectId')
    async createTodo(@Param('projectId') projectId: string, @Body() request: CreateTodoRequest): Promise<void> {
        await this.createTodoService.execute(request, projectId);
    }

    @Permission([Authority.USER])
    @HttpCode(204)
    @Patch(':dailyReportId')
    async changeStatus(@Param('dailyReportId') dailyReportId: string) {
        await this.changeTodoStatusUseCase.execute(dailyReportId);
    }

    @Permission([Authority.USER])
    @HttpCode(204)
    @Delete(':dailyReportId')
    async deleteTodo(@Param('dailyReportId') dailyReportId: string): Promise<void> {
        await this.deleteTodoUseCase.execute(dailyReportId);
    }

    @Permission([Authority.USER])
    @Get('/:projectId/today')
    async getDailyTodo(@Param('projectId') projectId: string): Promise<QueryTodosResponse> {
        return await this.queryDailyTodosUseCase.execute(projectId);
    }

    @Permission([Authority.USER])
    @Get('/:projectId/history')
    async getDailyReportHistory(@Param('projectId') projectId: string): Promise<QueryTodosResponse> {
        return await this.queryDailyReportHistoryUseCase.execute(projectId);
    }
}