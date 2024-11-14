import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { instanceToPlain } from 'class-transformer';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envConfig } from 'src/config/env.config';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { IExtractJwtPayload } from '../interface/jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envConfig.jwt.secret,
    });
  }

  async validate(payload: IExtractJwtPayload): Promise<Record<string, User>> {
    const { userId, email } = payload;
    if (!userId || !email) {
      return null;
    }
    const user = await this.usersService.findOne({ id: userId });
    return instanceToPlain(user);
  }
}
