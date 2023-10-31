export class QueryRepositoriesResponse {
    full_name: string;
    description: string;
    language: string;
}

export class QueryRepositoryDetailsResponse {
    name: string;
}

export class QueryUserInfoResponse {
    accountId: string;
    avatarUrl: string;
}

export class QueryOrganizationsResponse {
    login: string;
}
