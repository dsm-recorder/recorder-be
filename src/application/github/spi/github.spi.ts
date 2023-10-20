export interface GithubPort {
  getUserRepositories(username: string): Promise<any>;
  getRepositoryDetails(repositoryName: string): Promise<any>;
}

export const GithubPort = Symbol('IGithubPort');
