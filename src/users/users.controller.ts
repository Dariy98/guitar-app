import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: User): Promise<User> {
    console.log('createUser func');
    return;
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<User> {
    console.log('delete user func');
    return;
  }

  @Put(':id')
  update(@Body() user: User, @Param('id') id: string): Promise<User> {
    console.log('update user func');
    return;
  }
}