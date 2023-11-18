import { Inject, Injectable } from '@nestjs/common';
import { CommentPort } from '../spi/comment.spi';
import { QueryProjectCommentsResponse } from '../dto/comment.dto';

@Injectable()
export class QueryProjectCommentsUseCase {
    constructor(
        @Inject(CommentPort)
        private readonly commentPort: CommentPort
    ) {}

    async execute(projectId: string, userId: string): Promise<QueryProjectCommentsResponse> {
        const comments = await this.commentPort.queryProjectComments(projectId, userId);

        return {
            count: comments.length,
            comments
        }
    }
}