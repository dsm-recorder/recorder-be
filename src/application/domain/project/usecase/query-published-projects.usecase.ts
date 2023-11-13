import { Inject, Injectable } from '@nestjs/common';
import { ProjectPort } from '../spi/project.spi';
import { QueryPublishedProjectsResponse } from '../../pr_record/dto/pr-record.dto';

@Injectable()
export class QueryPublishedProjectsUseCase {
    constructor(
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort
    ) {
    }

    async execute(): Promise<QueryPublishedProjectsResponse> {
        return {
            projects: await this.projectPort.queryProjectsByPublished(true)
        };
    }
}