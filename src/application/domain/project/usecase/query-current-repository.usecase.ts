import { Inject, Injectable } from '@nestjs/common';
import { QueryRepositoriesResponse } from '../dto/project.dto';
import { AxiosPort } from '../../../common/spi/axios.spi';
import { User } from '../../user/user';
import { ProjectGithubAxiosPort } from '../spi/project.spi';

@Injectable()
export class QueryCurrentRepositoryUseCase {
    constructor(
        @Inject(AxiosPort)
        private readonly githubPort: ProjectGithubAxiosPort
    ) {}

    async execute(user: User): Promise<QueryRepositoriesResponse> {
        const repositories = await this.githubPort.getUserRepositories(user.githubAccountId);

        return {
            repos: repositories.map((item) => ({
                name: item.full_name,
                description: item.description,
                language: item.language
            }))
        };
    }
}
