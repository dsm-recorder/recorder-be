import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';

@Entity('tbl_project')
export class ProjectTypeormEntity {

    @PrimaryGeneratedColumn('uuid', { name: 'project_id' })
    id: string;

    @ManyToOne(() => UserTypeormEntity, (user) => user.projects, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user: UserTypeormEntity;

    @Column('varchar', { nullable: false, length: 20 })
    name: string;

    @Column('simple-array', { nullable: true })
    skills?: string[];

    @Column('varchar', { length: 255, default: null })
    logoUrl?: string;

    @Column('varchar', { length: 400, default: null, nullable: true })
    description?: string;

    @Column('varchar', { nullable: false })
    githubOwnerRepository: string;

    @Column('tinyint', { nullable: false })
    isPublished: boolean;

    @Column('varchar', { length: 200, nullable: true })
    role?: string;

    @Column('varchar', { length: 200, nullable: true })
    learned?: string;

    @CreateDateColumn()
    createdAt?: Date;

    @Column('datetime', { nullable: true })
    finishDate?: Date;

    constructor(id: string, user: UserTypeormEntity, name: string, skills: string[],
                logoUrl: string, description: string, githubOwnerRepository: string,
                isPublished: boolean, finishDate: Date, role?: string, learned?: string) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.skills = skills;
        this.logoUrl = logoUrl;
        this.description = description;
        this.githubOwnerRepository = githubOwnerRepository;
        this.isPublished = isPublished;
        this.role = role;
        this.learned = learned;
        this.finishDate = finishDate;
    }
}
