import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProjectTypeormEntity } from '../../project/persistence/project.entity';
import { UserTypeormEntity } from '../../user/persistence/user.entity';

@Entity('tbl_like')
export class LikeTypeormEntity {
    @PrimaryColumn('varchar', { name: 'user_id' })
    userId: string;

    @PrimaryColumn('varchar', { name: 'project_id' })
    projectId: string;

    @ManyToOne(() => ProjectTypeormEntity, (project) => project, {
        onDelete: 'CASCADE'
    })
    project: ProjectTypeormEntity;

    @ManyToOne(() => UserTypeormEntity, (user) => user, {
        onDelete: 'CASCADE'
    })
    user: UserTypeormEntity;

    constructor(project: ProjectTypeormEntity, user: UserTypeormEntity) {
        this.project = project;
        this.user = user;
    }
}
