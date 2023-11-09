import { Inject, Injectable } from '@nestjs/common';
import { AxiosPort } from '../../../common/spi/axios.spi';
import { ProjectGithubAxiosPort } from '../spi/project.spi';
import { User } from '../../user/user';
import { QueryCurrentOrganizationsResponse } from '../dto/project.dto';

@Injectable()
export class QueryCurrentOrganizationsUseCase {
    constructor(
        @Inject(AxiosPort)
        private readonly githubPort: ProjectGithubAxiosPort
    ) {}

    async execute(user: User): Promise<QueryCurrentOrganizationsResponse> {
        const response = await this.githubPort.getOrganizationsByUsername(user.githubAccountId);

        return {
            organizations: response.map((response) => response.login)
        };
    }
}
