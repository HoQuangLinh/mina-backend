import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'src/database/base/base.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User extends BaseEntity {
  @Column({ length: 60, nullable: false })
  email: string;

  @Column({ length: 200, nullable: true })
  avatarUrl: string;
}
