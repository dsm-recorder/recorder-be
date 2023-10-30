export class QueryCurrentRepositoryResponse {
    repos: {
        name: string;
        description: string;
        language: string;
    }[];
}

export class QueryCurrentOrganizationsResponse {
    organizations: string[];
}