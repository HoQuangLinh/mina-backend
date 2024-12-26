import { User } from 'src/users/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class UserRoom {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  roomId: number;

  @CreateDateColumn({ type: 'timestamp' })
  joinedAt: Date;

  @ManyToOne(() => User, (user) => user.userRooms)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Room, (room) => room.userRooms)
  @JoinColumn({ name: 'roomId' })
  room: Room;
}
