import { UsersService } from "../users/users.service";
import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { Messages } from "../interfaces/messages";

@Controller("login")
export class LoginController {

  constructor(
    private userService: UsersService
  ) {
  }

  @Post()
  async checkUser(@Body() data, @Res() res: Response) {
    console.log("checkUser: ", data);
    if (!Object.keys(data).length) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const user = await this.userService.findByEmail(data.email);

    if (user) {
      bcrypt.compare(data.password, user.password, async (err, result) => {
        if (err) {
          throw (err);
        }
        if (result) {
          res.status(HttpStatus.OK).json({ ...user, password: null });
        } else {
          res.status(HttpStatus.UNAUTHORIZED).json(Messages.InvalidPassword);
        }
      });
    } else {
      res.status(HttpStatus.NOT_FOUND).json(Messages.UserNotFound);
    }
  }

}
