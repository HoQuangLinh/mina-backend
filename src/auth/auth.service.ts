import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { envConfig } from 'src/config/env.config';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
  }

  async validateGoogleUser(email: string, avatarUrl: string): Promise<any> {
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
}
