import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';

@Entity('tbl_project')
export class ProjectTypeormEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'project_id' })
  id: string;

  @ManyToOne(() => UserTypeormEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserTypeormEntity;

  @Column('varchar', { nullable: false, length: 20 })
  name: string;

  @Column('varchar', { nullable: false, length: 100 })
  skills: string;

  @Column('tinyint', { nullable: false })
  isPublic: boolean;

  @Column('varchar', { length: 255 })
  logoUrl: string;

  @Column('varchar', { length: 400 })
  description: string;
}
