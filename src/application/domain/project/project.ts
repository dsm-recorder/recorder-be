import { LocalDate } from 'js-joda';

export class Project {
    id?: string;
    userId: string;
    name: string;
    skills?: string[];
    isPublic: boolean;
    logoUrl?: string;
    githubOwnerRepository: string;
    description?: string;
    isPublished: boolean;
    role?: string;
    learned?: string;
    createdAt?: LocalDate;
    finishDate: LocalDate;


    public publish(role: string, learned: string) {
        this.isPublished = true;
        this.role = role;
        this.learned = learned;
        this.finishDate = LocalDate.now();
    }

    public update(
        name: string,
        skills: string[],
        logoUrl: string,
        description?: string
    ) {
        this.name = name;
        this.skills = skills;
        this.logoUrl = logoUrl;
        this.description = description;
    }

    constructor(userId: string, name: string, skills: string[],
                isPublic: boolean, logoUrl: string, githubOwnerRepository: string,
                description: string, isPublished: boolean,
                createdAt?: LocalDate, finishDate?: LocalDate, role?: string, learned?: string, id?: string) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.skills = skills;
        this.isPublic = isPublic;
        this.logoUrl = logoUrl;
        this.githubOwnerRepository = githubOwnerRepository;
        this.description = description;
        this.isPublished = isPublished;
        this.role = role;
        this.learned = learned;
        this.createdAt = createdAt;
        this.finishDate = finishDate;
    }
}
