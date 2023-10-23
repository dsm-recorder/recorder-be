import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { GithubPort } from '../../../application/github/spi/github.spi';
import { QueryRepositoryDetailsResponse, QueryUserRepositoriesResponse } from './dto/github.dto';
import { getAndHandleError } from '../util/axios.util';

@Injectable()
export class GithubAdapter implements GithubPort {
  async getUserRepositories(username: string): Promise<QueryUserRepositoriesResponse[]> {
    let response = await getAndHandleError(`https://api.github.com/users/${username}/repos`);
    return response;
  }

  async getRepositoryDetails(repositoryName: string): Promise<QueryRepositoryDetailsResponse> {
    return await getAndHandleError(`https://api.github.com/repos/${repositoryName}`);
  }
}
