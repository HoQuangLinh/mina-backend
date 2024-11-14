import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { envConfig } from 'src/config/env.config';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import {
  classToPlain,
  instanceToInstance,
  instanceToPlain,
} from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
    private dataSource: DataSource,
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

  async generateToken({ email, id }: User): Promise<string> {
    const payload = { email, userId: id };
    return await this.jwtService.signAsync(payload, {
      secret: envConfig.jwt.secret,
      expiresIn: envConfig.jwt.expireIn,
    });
  }

  async login(payload: LoginDto) {
    const { email, password } = payload;
    const user = await this.usersService.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Username or password not correct!');
    }

    const isValidPassword = await bcrypt.compare(password, user?.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Username or password not correct!');
    }
    return user;
  }
  async register(payload: RegisterUserDto) {
    const { email, password, nationCode, languageCode } = payload;

    const user = await this.usersService.findOne({ email });
    if (user?.email) {
      throw new UnauthorizedException('This email has been register!');
    }

    const passportHash = await bcrypt.hash(
      password,
      parseInt(envConfig.password.saltRound),
    );
    return await this.usersService.save({
      email,
      nationCode,
      languageCode,
      password: passportHash,
    });
  }
}
