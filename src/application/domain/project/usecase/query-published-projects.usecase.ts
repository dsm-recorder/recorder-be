import { Inject, Injectable } from '@nestjs/common';
import { ProjectPort } from '../spi/project.spi';
import { QueryPublishedProjectsResponse } from '../dto/project.dto';

@Injectable()
export class QueryPublishedProjectsUseCase {
    constructor(
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort
    ) {
    }

    async execute(currentUserId: string): Promise<QueryPublishedProjectsResponse> {
        return {
            projects: await this.projectPort.queryProjectsByPublished(true, currentUserId)
        };
    }
}