import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { envConfig } from 'src/config/env.config';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    // Implement later
  }

  async findOneOrCreate(email: string, avatarUrl: string): Promise<User> {
    const user = await this.usersService.findOne({ email });
    if (!user) {
      return await this.usersService.save({
        email,
        avatarUrl,
      });
    }
    return user;
  }

  async generateToken({ email, id }: User) {
    const payload = { email, userId: id };
    return await this.jwtService.signAsync(payload, {
      secret: envConfig.jwt.secret,
      expiresIn: envConfig.jwt.expireIn,
    });
  }

  async login(payload: LoginDto) {
    return true;
  }
}
