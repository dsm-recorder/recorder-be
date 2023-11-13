export class CreateProjectRequest {
    projectName: string;
    repositoryName: string;
    logoImageUrl: string;
    description: string;
    skills: string[];
}

export class PublishProjectRequest {
    role: string;
    learned: string;
    prRecordIds: string[];
}