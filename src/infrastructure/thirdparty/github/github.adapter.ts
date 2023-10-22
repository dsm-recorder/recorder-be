import { Injectable } from '@nestjs/common';
import { GithubPort } from '../../../application/github/spi/github.spi';
import axios from 'axios';

@Injectable()
export class GithubAdapter implements GithubPort {
  async getUserRepositories(username: string): Promise<any> {
    return await axios.get(`https://api.github.com/users/${username}/repos`);
  }

  async getRepositoryDetails(repositoryName: string): Promise<any> {
    return await axios.get(`https://api.github.com/repos/${repositoryName}`);
  }
}
