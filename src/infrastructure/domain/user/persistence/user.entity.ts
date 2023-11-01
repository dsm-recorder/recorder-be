import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectTypeormEntity } from '../../project/presistence/project.entity';

@Entity('tbl_user')
export class UserTypeormEntity {
    constructor(githubAccountId: string, profileUrl: string, authority: string, id?: string) {
        this.id = id;
        this.githubAccountId = githubAccountId;
        this.profileUrl = profileUrl;
        this.authority = authority;
    }

    @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
    id: string;

    @Column('varchar', { unique: true, nullable: false, length: 50 })
    githubAccountId: string;

    @Column('varchar')
    profileUrl: string;

    @Column('varchar', { length: 5 })
    authority: string;

    @OneToMany(() => ProjectTypeormEntity, (project) => project.user, {
        cascade: true,
    })
    projects: ProjectTypeormEntity[];
}

export const Authority = {
    USER: 'USER',
    ADMIN: 'ADMIN',
};
