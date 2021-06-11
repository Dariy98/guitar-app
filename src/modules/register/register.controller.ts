import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { User } from "../entities/user.entity";
import { UsersService } from "../users/users.service";
import { Messages } from "../interfaces/messages";

@Controller("register")
export class RegisterController {

  constructor(
    private userService: UsersService
  ) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() user: User) {
    console.log("register user: ", user);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      return Messages.EmailNotValid;
    }
    if (user.password.length < 4) {
      return Messages.PasswordIsShort;
    }
    const hash = await bcrypt.hash(user.password, 10);
    // const salt = await bcrypt.genSalt();
    // console.log('salt', salt);

    const savedUser = await this.userService.createUser({ ...user, password: hash });
    return { ...savedUser, password: null };
  }
}

