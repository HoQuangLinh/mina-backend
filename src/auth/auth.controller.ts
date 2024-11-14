import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { envConfig } from 'src/config/env.config';
import { Public } from 'src/decorators/public.decorator';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Constants } from '../commons/constants';
import { JwtUser } from '../decorators/jwt-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    // This route initiates Google login
  }

  @Public()
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = req.user as User;
    const token = await this.authService.generateToken(user);
    res.cookie(Constants.accessToken, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 1000,
    });

    return res.redirect(envConfig.client.url);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res: Response) {
    const user = req.user as User;
    const token = await this.authService.generateToken(user);
    res.cookie(Constants.accessToken, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 1000,
    });
    return res.json({ message: 'Login successful!', data: token });
  }

  @Public()
  @Post('register')
  async register(@Body() payload: RegisterUserDto, @Res() res: Response) {
    const user = await this.authService.register(payload);
    const token = await this.authService.generateToken(user);
    res.cookie(Constants.accessToken, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 1000,
    });
    return res.json({ message: 'Register successful!', data: token });
  }

  @Get('me')
  async getMe(@JwtUser() user) {
    return user;
  }
}
