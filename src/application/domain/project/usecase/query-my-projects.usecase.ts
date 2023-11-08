import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../user/user';
import { ProjectPort } from '../spi/project.spi';
import { ProjectResponse, QueryMyProjectsResponse } from '../dto/project.dto';

@Injectable()
export class QueryMyProjectsUseCase {
    constructor(
        @Inject(ProjectPort)
        private readonly projectPort: ProjectPort
    ) {}

    async execute(user: User): Promise<QueryMyProjectsResponse> {
        const projects = await this.projectPort.queryProjectsByUserId(user.id);

        return {
            projects: projects.map((project): ProjectResponse => {
                return {
                    name: project.name,
                    logoImageUrl: project.logoUrl,
                    createdAt: project.createdAt,
                    description: project.description
                };
            })
        };
    }
}