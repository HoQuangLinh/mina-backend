import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { envConfig } from 'src/config/env.config';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // This route initiates Google login
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = req.user as User;
    const token = await this.authService.generateToken(user);
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 1000,
    });

    return res.redirect(envConfig.client.url);
  }

  // @IgnoreResponseFormat()
  @Post('login')
  async login(@Body() payload: LoginDto, @Res() res: Response) {
    const user = await this.authService.login(payload);
    const token = await this.authService.generateToken(user);
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 1000,
    });
    return res.json({ message: 'Login successful!', data: token });
  }

  @Post('register')
  async register(@Body() payload: RegisterUserDto) {
    const data = await this.authService.register(payload);
    return data;
  }
}
