import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryProjectCommentsResponse } from '../../../../application/domain/comment/dto/comment.dto';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';
import {
    QueryProjectCommentsUseCase
} from '../../../../application/domain/comment/usecase/query-project-comments.usecase';

@Controller('comments')
export class CommentWebAdapter {
    constructor(
        private readonly queryProjectCommentsUseCase: QueryProjectCommentsUseCase
    ) {}

    @Permission([Authority.USER])
    @Get(':projectId')
    async queryProjectComments(
        @Param('projectId') projectId: string,
        @CurrentUser() user: User
    ): Promise<QueryProjectCommentsResponse> {
        return await this.queryProjectCommentsUseCase.execute(projectId, user.id);
    }
}