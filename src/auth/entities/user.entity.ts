import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/database/base/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ length: 50 })
  username: string;

  @Column({ length: 50 })
  password: string;
}
