import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProjectTypeormEntity } from '../../project/persistence/project.entity';
import { UserTypeormEntity } from '../../user/persistence/user.entity';

@Entity('tbl_like')
export class LikeTypeormEntity {
    @ManyToOne(() => ProjectTypeormEntity, (project) => project, {
        onDelete: 'CASCADE',
    })
    @PrimaryColumn('varchar', { name: 'project_id' })
    project: ProjectTypeormEntity;

    @ManyToOne(() => UserTypeormEntity, (user) => user, {
        onDelete: 'CASCADE',
    })
    @PrimaryColumn('varchar', { name: 'user_id' })
    user: UserTypeormEntity;

    constructor(project: ProjectTypeormEntity, user: UserTypeormEntity) {
        this.project = project;
        this.user = user;
    }
}
