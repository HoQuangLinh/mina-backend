import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(query: Partial<User>): Promise<User> {
    return this.userRepository.findOne({ where: query });
  }

  async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  async save(user: Partial<User>) {
    return this.userRepository.save(user);
  }
}
