import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentPort } from '../spi/comment.spi';
import { QueryProjectCommentsResponse } from '../dto/comment.dto';
import { ProjectPort } from '../../project/spi/project.spi';

@Injectable()
export class QueryProjectCommentsUseCase {
    constructor(
        @Inject(CommentPort)
        private readonly commentPort: CommentPort,

        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort
    ) {}

    async execute(projectId: string, userId: string): Promise<QueryProjectCommentsResponse> {
        if (!await this.projectPort.existsProjectById(projectId)) {
            throw new NotFoundException('Project Not Found');
        }
        const comments = await this.commentPort.queryProjectComments(projectId, userId);

        return {
            count: comments.length,
            comments
        }
    }
}