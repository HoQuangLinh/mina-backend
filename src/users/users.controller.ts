import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  async get() {
    const data = await this.usersService.find();
    return data;
  }
}
