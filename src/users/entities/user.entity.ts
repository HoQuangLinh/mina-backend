import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/database/base/base.entity';
import { Column, DeleteDateColumn, Entity, Index } from 'typeorm';

@Entity()
@Index('IDX_EMAIL', ['email'])
export class User extends BaseEntity {
  @Column({ length: 60, nullable: false })
  email: string;

  @Column({ length: 100, nullable: true })
  @Exclude()
  password: string;

  @Column({ length: 100, nullable: true })
  nationCode: string;

  @Column({ length: 10, nullable: true })
  languageCode: string;

  @Column({ length: 200, nullable: true })
  avatarUrl: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
