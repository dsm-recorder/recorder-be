import { LocalDate } from 'js-joda';

export class Project {
    constructor(
        userId: string,
        name: string,
        skills: string[],
        isPublic: boolean,
        logoUrl: string,
        githubOwnerRepository: string,
        description: string,
        createdAt?: LocalDate,
        id?: string,
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.skills = skills;
        this.isPublic = isPublic;
        this.logoUrl = logoUrl;
        this.githubOwnerRepository = githubOwnerRepository;
        this.description = description;
        this.createdAt = createdAt;
    }

    id?: string;
    userId: string;
    name: string;
    skills?: string[];
    isPublic: boolean;
    logoUrl?: string;
    githubOwnerRepository: string;
    description?: string;
    createdAt?: LocalDate;

    public update(name: string, skills: string[], logoUrl: string, description?: string) {
        this.name = name;
        this.skills = skills;
        this.logoUrl = logoUrl;
        this.description = description;
    }
}
