import { Injectable } from '@nestjs/common';
import { GithubPort } from '../../../application/github/spi/github.spi';
import axios from 'axios';
import { QueryRepositoryDetailsResponse, QueryUserRepositoriesResponse } from './dto/github.dto';

@Injectable()
export class GithubAdapter implements GithubPort {
  async getUserRepositories(username: string): Promise<QueryUserRepositoriesResponse[]> {
    return (await axios.get<QueryUserRepositoriesResponse[]>(`https://api.github.com/users/${username}/repos`)).data;
  }

  async getRepositoryDetails(repositoryName: string): Promise<QueryRepositoryDetailsResponse> {
    return (await axios.get(`https://api.github.com/repos/${repositoryName}`)).data;
  }
}
