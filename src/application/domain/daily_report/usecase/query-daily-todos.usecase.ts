import { Inject, Injectable } from '@nestjs/common';
import { DailyReportPort } from '../spi/daily-report.spi';
import { LocalDate } from 'js-joda';
import { QueryTodosResponse, TodoResponse } from '../dto/daily-report.dto';

@Injectable()
export class QueryDailyTodosUseCase {
    constructor(
        @Inject(DailyReportPort)
        private readonly dailyReportPort: DailyReportPort
    ) {}

    async execute(projectId: string): Promise<QueryTodosResponse> {
        const todos =
            await this.dailyReportPort.queryDailyReportsByDateAndProjectId(LocalDate.now(), projectId);
        
        return {
            todos: todos.map((todo): TodoResponse => {
                return {
                    id: todo.id,
                    content: todo.content,
                    complete: todo.isComplete
                };
            })
        };
    }

}

