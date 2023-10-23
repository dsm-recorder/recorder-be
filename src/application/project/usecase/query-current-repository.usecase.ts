import { Inject, Injectable } from '@nestjs/common';
import { QueryCurrentRepositoryResponse } from '../dto/project.dto';
import { GithubPort } from '../../github/spi/github.spi';

@Injectable()
export class QueryCurrentRepositoryUseCase {
  constructor(
    @Inject(GithubPort)
    private readonly githubPort: GithubPort
  ) {}

  async execute(name: string): Promise<QueryCurrentRepositoryResponse> {
    const repositories = await this.githubPort.getUserRepositories(name);

    let names: { name: string; description: string; language: string }[] = repositories.map(item => ({
      name: item.full_name,
      description: item.description,
      language: item.language
    }));

    return {
      repos: names
    };
  }
}
