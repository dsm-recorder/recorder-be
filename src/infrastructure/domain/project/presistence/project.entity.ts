import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';

@Entity('tbl_project')
export class ProjectTypeormEntity {

    constructor(id: string, user: Promise<UserTypeormEntity>, name: string, skills: string, isPublic: boolean, logoUrl: string, description: string, githubOwnerRepository: string, createdAt: Date) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.skills = skills;
        this.isPublic = isPublic;
        this.logoUrl = logoUrl;
        this.description = description;
        this.githubOwnerRepository = githubOwnerRepository;
        this.createdAt = createdAt;
    }

    @PrimaryGeneratedColumn('uuid', { name: 'project_id' })
    id: string;

    @ManyToOne(() => UserTypeormEntity, (user) => user.projects, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: Promise<UserTypeormEntity>;

    @Column('varchar', { nullable: false, length: 20 })
    name: string;

    @Column('varchar', { length: 100, default: null })
    skills?: string;

    @Column('tinyint', { nullable: false })
    isPublic: boolean;

    @Column('varchar', { length: 255, default: null })
    logoUrl?: string;

    @Column('varchar', { length: 400, default: null })
    description?: string;

    @Column('varchar', { nullable: false })
    githubOwnerRepository: string;

    @CreateDateColumn()
    createdAt?: Date;
}
