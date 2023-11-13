import { Project } from '../project';
import {
    QueryOrganizationsResponse,
    QueryRepositoriesResponse,
    QueryRepositoryDetailsResponse
} from '../../../../infrastructure/thirdparty/axios/dto/github.dto';
import { PublishedProjectResponse } from '../../pr_record/dto/pr-record.dto';

export interface ProjectPort {
    saveProject(project: Project): Promise<Project>;

    queryProjectsByUserId(userId: string): Promise<Project[]>;

    queryProjectById(id: String): Promise<Project>;

    queryProjectByUserIdAndRepositoryName(userId: string, repositoryName: string): Promise<Project>;

    queryProjectsByPublished(published: boolean): Promise<PublishedProjectResponse[]>;
}

export interface ProjectGithubAxiosPort {
    getUserRepositories(username: string): Promise<QueryRepositoriesResponse[]>;

    getRepositoryDetails(repositoryName: string): Promise<QueryRepositoryDetailsResponse>;

    getOrganizationsByUsername(username: string): Promise<QueryOrganizationsResponse[]>;

    getOrganizationRepositories(organization: string): Promise<QueryRepositoriesResponse[]>;
}

export const ProjectPort = Symbol('IProjectPort');
