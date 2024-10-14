import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/constants/repository.constant';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async login(payload: CreateUserDto) {
    const { username, password } = payload;
    const newUser = this.userRepository.create({
      username,
      password,
    });
    return await this.userRepository.save(newUser);
  }
}
