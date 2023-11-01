export class Project {
    id?: string;
    userId: string;
    name: string;
    skills?: string[];
    isPublic: boolean;
    logoUrl?: string;
    githubOwnerRepository: string;
    description?: string;
    createdAt?: Date;
}
