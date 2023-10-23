import {
  QueryRepositoryDetailsResponse,
  QueryUserRepositoriesResponse
} from '../../../infrastructure/thirdparty/github/dto/github.dto';

export interface GithubPort {
  getUserRepositories(username: string): Promise<QueryUserRepositoriesResponse[]>;
  getRepositoryDetails(repositoryName: string): Promise<QueryRepositoryDetailsResponse>;
}

export const GithubPort = Symbol('IGithubPort');
