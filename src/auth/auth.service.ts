import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { envConfig } from 'src/config/env.config';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { IExtractJwtPayload } from './interface/jwt.interface';
import { IUser } from './interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async findOneOrCreate(payload: IUser): Promise<User> {
    const { email, avatarUrl, provider } = payload;
    const user = await this.usersService.findOne({ email });
    if (!user) {
      return await this.usersService.save({
        email,
        avatarUrl,
        provider,
      });
    }
    return user;
  }

  async generateToken({ email, id }: User): Promise<string> {
    const payload: IExtractJwtPayload = { email, userId: id };
    return await this.jwtService.signAsync(payload, {
      secret: envConfig.jwt.secret,
      expiresIn: envConfig.jwt.expireIn,
    });
  }

  async login(payload: LoginDto): Promise<Record<string, User>> {
    const { email, password } = payload;
    const user = await this.usersService.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Username or password not correct!');
    }

    const isValidPassword = await bcrypt.compare(password, user?.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Username or password not correct!');
    }
    return instanceToPlain(user);
  }
  async register(payload: RegisterUserDto): Promise<User> {
    const { email, password } = payload;

    const user = await this.usersService.findOne({ email });
    if (user?.email) {
      throw new UnauthorizedException('This email has been register!');
    }

    const passportHash = await bcrypt.hash(
      password,
      parseInt(envConfig.password.saltRound),
    );
    const savedUser = await this.usersService.save({
      email,
      password: passportHash,
    });
    return savedUser;
  }
}
