import { LocalDate } from 'js-joda';

export class QueryCurrentOrganizationsResponse {
    organizations: string[];
}

export class QueryRepositoriesResponse {
    repos: {
        name: string;
        description: string;
        language: string;
    }[];
}

export class QueryMyProjectsResponse {
    projects: ProjectResponse[];
}

export class ProjectResponse {
    id: string;
    name: string;
    logoImageUrl: string;
    isPublished: boolean;
    createdAt: LocalDate;
    finishDate: LocalDate;
    description: string;
}

export class UpdateProjectRequest {
    name: string;
    skills: string[];
    logoUrl: string;
    description?: string;
}

export class QueryPublishedProjectsResponse {
    projects: PublishedProjectResponse[]
}

export class PublishedProjectResponse {
    id: string;
    name: string;
    startDate: string;
    finishDate: string;
    userProfileUrl: string;
    userAccountId: string;
    likeCount: number;
    isLiked: boolean;
}
