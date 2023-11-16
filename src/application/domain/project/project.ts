import { LocalDate } from 'js-joda';

export class Project {
    id?: string;
    userId: string;
    name: string;
    skills?: string[];
    logoUrl?: string;
    githubOwnerRepository: string;
    description?: string;
    isPublished: boolean;
    role?: string;
    learned?: string;
    likeCount: number;
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

    public addLikeCount() {
        this.likeCount += 1;
    }

    public reduceLikeCount() {
        this.likeCount -= 1;
    }

    constructor(userId: string, name: string, skills: string[], logoUrl: string, githubOwnerRepository: string,
                description: string, isPublished: boolean, likeCount: number, createdAt?: LocalDate, finishDate?: LocalDate,
                role?: string, learned?: string, id?: string) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.skills = skills;
        this.logoUrl = logoUrl;
        this.githubOwnerRepository = githubOwnerRepository;
        this.description = description;
        this.isPublished = isPublished;
        this.role = role;
        this.learned = learned;
        this.likeCount = likeCount;
        this.createdAt = createdAt;
        this.finishDate = finishDate;
    }
}
