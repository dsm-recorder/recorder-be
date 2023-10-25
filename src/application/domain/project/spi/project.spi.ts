import { Project } from '../project';
import {
  QueryRepositoryDetailsResponse,
  QueryUserRepositoriesResponse
} from '../../../../infrastructure/thirdparty/axios/dto/github.dto';

export interface ProjectPort {
  saveProject(project: Project): Promise<Project>;
}

export interface ProjectGithubAxiosPort {
  getUserRepositories(username: string): Promise<QueryUserRepositoriesResponse[]>;
  getRepositoryDetails(repositoryName: string): Promise<QueryRepositoryDetailsResponse>;
}

export const ProjectPort = Symbol('IProjectPort');
