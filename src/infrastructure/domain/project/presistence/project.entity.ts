import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';

@Entity('tbl_project')
export class ProjectTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'project_id' })
    id: string;

    @ManyToOne(() => UserTypeormEntity, (user) => user.projects, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: UserTypeormEntity;

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
