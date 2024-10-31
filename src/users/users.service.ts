import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../constants/repository.constant';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  async findOne(query: Partial<User>): Promise<User> {
    return this.userRepository.findOne({ where: query });
  }

  async save(user: Partial<User>) {
    return this.userRepository.save(user);
  }
}
