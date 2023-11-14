import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectPort } from '../spi/project.spi';
import { QueryProjectIdResponse } from '../dto/project.dto';

@Injectable()
export class QueryProjectIdUseCase {
    constructor(
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort
    ) {}

    async execute(repositoryName: string, currentUserId: string): Promise<QueryProjectIdResponse> {
        const project =
            await this.projectPort.queryProjectByRepositoryNameAndUserId(repositoryName, currentUserId);
        if (!project) {
            throw new NotFoundException('Project Not Found')
        }

        return {
            projectId: project.id
        }
    }
}