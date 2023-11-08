import { Project } from '../project';
import {
    QueryOrganizationsResponse,
    QueryRepositoriesResponse,
    QueryRepositoryDetailsResponse
} from '../../../../infrastructure/thirdparty/axios/dto/github.dto';

export interface ProjectPort {
    saveProject(project: Project): Promise<Project>;

    queryProjectsByUserId(userId: string): Promise<Project[]>;

    queryProjectById(id: String): Promise<Project>;

    queryProjectByUserIdAndRepositoryName(userId: string, repositoryName: string): Promise<Project>;
}

export interface ProjectGithubAxiosPort {
    getUserRepositories(username: string): Promise<QueryRepositoriesResponse[]>;

    getRepositoryDetails(repositoryName: string): Promise<QueryRepositoryDetailsResponse>;

    getOrganizationsByUsername(username: string): Promise<QueryOrganizationsResponse[]>;

    getOrganizationRepositories(organization: string): Promise<QueryRepositoriesResponse[]>;
}

export const ProjectPort = Symbol('IProjectPort');
