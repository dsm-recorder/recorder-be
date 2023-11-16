export class CheckSpellResponse {
    errorInfo: SpellErrorResponse[];
}

export class SpellErrorResponse {
    help: string;
    errorIdx: number;
    correctMethod: number;
    start: number;
    end: number;
    errMsg: string;
    orgStr: string;
    candWord: string;
}
