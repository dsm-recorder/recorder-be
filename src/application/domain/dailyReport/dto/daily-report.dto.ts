import { LocalDate } from 'js-joda';

export class QueryTodosResponse {
    todos: TodoResponse[]
}

export class TodoResponse {
    id?: string;
    content: string;
    complete: boolean;
    date?: LocalDate;
}