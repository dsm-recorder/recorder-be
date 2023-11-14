import { Inject, Injectable } from '@nestjs/common';
import { LikePort } from '../spi/like.spi';
import { User } from '../../user/user';
import { Like } from '../like';

@Injectable()
export class LikeUseCase {
    constructor(
        @Inject(LikePort)
        private readonly likePort: LikePort,
    ) {}

    async execute(projectId: string, user: User) {
        const like: Like = await this.likePort.queryLikeByUserIdAndProjectId(user.id, projectId);
        if (!like) {
            await this.likePort.saveLike(new Like(projectId, user.id));
        } else {
            await this.likePort.deleteLike(like);
        }
    }
}
