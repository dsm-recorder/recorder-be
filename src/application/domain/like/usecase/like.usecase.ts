import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LikePort } from '../spi/like.spi';
import { User } from '../../user/user';
import { Like } from '../like';
import { ProjectPort } from '../../project/spi/project.spi';

@Injectable()
export class LikeUseCase {
    constructor(
        @Inject(LikePort)
        private readonly likePort: LikePort,
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort
    ) {}

    async execute(projectId: string, user: User) {
        const project = await this.projectPort.queryProjectById(projectId);
        if (!project) {
            throw new NotFoundException('Project Not Found');
        }
        if (!project.isPublished) {
            throw new ForbiddenException('Project is Not Published');
        }

        const like: Like = await this.likePort.queryLikeByUserIdAndProjectId(user.id, projectId);
        if (!like) {
            project.addLikeCount();
            await this.projectPort.saveProject(project);
            await this.likePort.saveLike(new Like(projectId, user.id));
        } else {
            project.reduceLikeCount();
            await this.projectPort.saveProject(project);
            await this.likePort.deleteLikeByUserIdAndProjectId(user.id, project.id);
        }
    }
}
