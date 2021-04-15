import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.userService.removeUser(id);
  }

  @Put(':id')
  update(@Body() user: User, @Param('id') id: string): Promise<void> {
    return this.userService.updateUser(id, user);
  }
}