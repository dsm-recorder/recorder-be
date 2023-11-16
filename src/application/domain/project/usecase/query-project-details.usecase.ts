import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ProjectPort } from '../spi/project.spi';
import { User } from '../../user/user';
import { QueryProjectDetailsResponse } from '../dto/project.dto';

@Injectable()
export class QueryProjectDetailsUseCase {
    constructor(
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort
    ) {}

    async execute(projectId: string, user: User): Promise<QueryProjectDetailsResponse> {
        const project = await this.projectPort.queryProjectById(projectId);
        if (!project) {
            throw new NotFoundException('Project Not Found');
        }

        if (project.userId !== user.id) {
            throw new UnauthorizedException('Invalid User');
        }

        return {
            id: project.id,
            name: project.name,
            startDate: project.createdAt,
            finishDate: project.finishDate,
            logoUrl: project.logoUrl,
            description: project.description
        };
    }
}
