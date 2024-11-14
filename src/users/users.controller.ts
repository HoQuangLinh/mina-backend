import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async get(@Query('email') email: string) {
    if (!email) {
      throw new BadRequestException('email param is required');
    }
    const data = await this.usersService.findOne({
      email: email,
    });
    return data;
  }
}
