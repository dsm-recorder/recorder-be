import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';
import { ProjectTypeormEntity } from '../../project/persistence/project.entity';

@Entity('tbl_comment')
export class CommentTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'comment_id' })
    id: string;

    @Column('varchar', { length: 50 })
    content: string;

    @ManyToOne(() => UserTypeormEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserTypeormEntity;

    @ManyToOne(() => ProjectTypeormEntity)
    @JoinColumn({ name: 'project_id' })
    project: ProjectTypeormEntity;


    constructor(content: string, user: UserTypeormEntity, project: ProjectTypeormEntity, id?: string) {
        this.id = id;
        this.content = content;
        this.user = user;
        this.project = project;
    }
}