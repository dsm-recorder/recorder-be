import { LocalDate } from 'js-joda';

export class QueryProjectCommentsResponse {
    count: number;
    comments: CommentResponse[];
}

export class CommentResponse {
    id: string;
    content: string;
    createdAt: LocalDate;
    userLogoImageUrl: string;
    userAccountId: string;
    isMine: string;
}