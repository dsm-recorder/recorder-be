import { Inject, Injectable } from '@nestjs/common';
import { AxiosPort } from '../../../common/spi/axios.spi';
import { ProjectGithubAxiosPort } from '../spi/project.spi';
import { QueryOrganizationRepositoriesResponse } from '../dto/project.dto';

@Injectable()
export class QueryOrganizationRepositoriesUseCase {
    constructor(
        @Inject(AxiosPort)
        private readonly githubPort: ProjectGithubAxiosPort,
    ) {}

    async execute(organization: string): Promise<QueryOrganizationRepositoriesResponse> {
        const repositories = await this.githubPort.getOrganizationRepositories(organization);

        return {
            repos: repositories.map((item) => ({
                name: item.full_name,
                description: item.description,
                language: item.language,
            })),
        };
    }
}
