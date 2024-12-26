import { BaseEntity } from 'src/database/base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRoom } from './user-room.entity';

@Entity()
export class Room extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => UserRoom, (userGroup) => userGroup.user)
  userRooms: UserRoom[];
}
