import { LocalDate } from 'js-joda';

export class DailyReport {
    constructor(
        private _content: string,
        private _isComplete: boolean,
        private _date: LocalDate,
        private _projectId: string,
        private _id?: string
    ) {}

    get content(): string {
        return this._content;
    }

    get isComplete(): boolean {
        return this._isComplete;
    }

    get date(): LocalDate {
        return this._date;
    }

    get id(): string {
        return this._id;
    }

    get projectId(): string {
        return this._projectId;
    }

    public toggleCompleteStatus() {
        this._isComplete = !this._isComplete;
    }
}