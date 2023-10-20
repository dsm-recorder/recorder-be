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

    let names: { name: string }[] = [];
    repositories.data.forEach(item => names.push({ name: item.full_name }));

    return {
      repos: names
    };
  }
}
