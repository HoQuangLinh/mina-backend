import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userProviders } from './provider/user.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [...userProviders, AuthService],
})
export class AuthModule {}
