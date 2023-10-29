import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export const Authority = {
    USER: 'USER',
    ADMIN: 'ADMIN',
};