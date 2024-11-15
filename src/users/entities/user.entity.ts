import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/database/base/base.entity';
import { Column, DeleteDateColumn, Entity, Index } from 'typeorm';
import { UserProvider, UserRole } from '../enums/user.enum';

@Entity()
@Index('IDX_EMAIL', ['email'])
export class User extends BaseEntity {
  @Column({ length: 60, nullable: false })
  email: string;

  @Column({ length: 100, nullable: true })
  @Exclude()
  password: string;

  @Column({ length: 200, nullable: true })
  avatarUrl: string;

  @Column({ nullable: true, default: UserRole.USER })
  role: UserRole;

  @Column({ nullable: true, default: UserProvider.LOCAL })
  provider: UserProvider;

  @DeleteDateColumn()
  deletedAt?: Date;
}
