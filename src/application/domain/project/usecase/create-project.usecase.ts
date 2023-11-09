import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ProjectPort } from '../spi/project.spi';
import { User } from '../../user/user';
import { CreateProjectRequest } from '../../../../infrastructure/domain/project/presentation/dto/project.web.dto';

@Injectable()
export class CreateProjectUseCase {
    constructor(
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort,
    ) {}

    async execute(request: CreateProjectRequest, user: User) {
        if (
            await this.projectPort.queryProjectByUserIdAndRepositoryName(
                user.id,
                request.repositoryName,
            )
        ) {
            throw new ConflictException('Project Already Exists');
        }

        await this.projectPort.saveProject({
            userId: user.id,
            name: request.projectName,
            logoUrl: request.logoImageUrl,
            description: request.description,
            skills: request.skills,
            githubOwnerRepository: request.repositoryName,
            isPublic: false,
        });
    }
}
