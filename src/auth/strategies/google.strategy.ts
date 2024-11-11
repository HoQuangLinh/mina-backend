import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { envConfig } from 'src/config/env.config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: envConfig.google.clientId,
      clientSecret: envConfig.google.clientSecret,
      callbackURL: envConfig.google.callbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<void> {
    const avatarUrl = profile?.photos[0]?.value;
    const email = profile?.emails[0]?.value;

    const user = await this.authService.findOneOrCreate(email, avatarUrl);

    done(null, user);
  }
}
