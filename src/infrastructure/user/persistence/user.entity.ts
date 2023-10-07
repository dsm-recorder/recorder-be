import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_user')
export class UserTypeormEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column('varchar', { unique: true, nullable: false, length: 50 })
  githubAccountId: string;

  @Column('varchar')
  profileUrl: string;
}
