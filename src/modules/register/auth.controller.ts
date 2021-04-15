import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  register(@Body() user: User) {
    console.log('register user: ', user);
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email)) {
      return this.userService.createUser(user);
    }
    return 'email is not valid!';
  }
}

