import { Inject, Injectable } from '@nestjs/common';
import { QueryCurrentRepositoryResponse } from '../dto/project.dto';
import { GithubPort } from '../../github/spi/github.spi';
import { User } from '../../user/user';

@Injectable()
export class QueryCurrentRepositoryUseCase {
  constructor(
    @Inject(GithubPort)
    private readonly githubPort: GithubPort
  ) {}

  async execute(user: User): Promise<QueryCurrentRepositoryResponse> {
    const repositories = await this.githubPort.getUserRepositories(user.githubAccountId);

    return {
      repos: repositories.map(item => ({
        name: item.full_name,
        description: item.description,
        language: item.language
      }))
    };
  }
}
