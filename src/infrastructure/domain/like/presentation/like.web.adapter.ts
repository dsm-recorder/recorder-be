import { Controller, HttpCode, Param, Patch } from '@nestjs/common';
import { LikeUseCase } from '../../../../application/domain/like/usecase/like.usecase';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';

@Controller('/likes')
export class LikeWebAdapter {
    constructor(private readonly likeUseCase: LikeUseCase) {}

    @Permission([Authority.USER])
    @HttpCode(204)
    @Patch('/:projectId')
    async like(@Param('projectId') projectId: string, @CurrentUser() user: User) {
        await this.likeUseCase.execute(projectId, user);
    }
}
