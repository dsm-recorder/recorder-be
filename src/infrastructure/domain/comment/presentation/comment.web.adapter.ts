import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QueryProjectCommentsResponse } from '../../../../application/domain/comment/dto/comment.dto';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';
import { QueryProjectCommentsUseCase } from '../../../../application/domain/comment/usecase/query-project-comments.usecase';
import { CreateCommentUseCase } from '../../../../application/domain/comment/usecase/create-comment..usecase';
import { CreateCommentRequest } from './comment.web.dto';

@Controller('comments')
export class CommentWebAdapter {
    constructor(
        private readonly queryProjectCommentsUseCase: QueryProjectCommentsUseCase,
        private readonly createCommentUseCase: CreateCommentUseCase
    ) {}

    @Permission([Authority.USER])
    @Get('/:projectId')
    async queryProjectComments(
        @Param('projectId') projectId: string,
        @CurrentUser() user: User
    ): Promise<QueryProjectCommentsResponse> {
        return await this.queryProjectCommentsUseCase.execute(projectId, user.id);
    }

    @Permission([Authority.USER])
    @Post('/:projectId')
    async createComment(
        @Param('projectId') projectId: string,
        @Body() request: CreateCommentRequest,
        @CurrentUser() user: User
    ) {
        return await this.createCommentUseCase.execute(projectId, request, user);
    }
}
