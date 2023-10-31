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
    name: string;
    logoImageUrl: string;
    createdAt: Date;
    description: string;
}
