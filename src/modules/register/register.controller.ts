import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { User } from "../entities/user.entity";
import { UsersService } from "../users/users.service";
import { Messages } from "../interfaces/messages";
import { JwtService } from "@nestjs/jwt";

@Controller("register")
export class RegisterController {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
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
    const savedUser = await this.userService.createUser({ ...user, password: hash });
    const userWithoutPass = { ...savedUser, password: null };
    return {
      access_token: this.jwtService.sign(userWithoutPass),
      user: userWithoutPass
    };
  }
}

