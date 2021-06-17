import { UsersService } from "../users/users.service";
import { Body, Controller, Get, HttpStatus, Param, Post, Res, UnauthorizedException } from "@nestjs/common";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { Messages } from "../interfaces/messages";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../constants/constants";

@Controller("login")
export class LoginController {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {
  }

  @Get(":token")
  async getOne(@Param("token") token: string) {
    console.log("getOne token: ", token);
    try {
      const payload = await this.jwtService.verify(token, { secret: jwtConstants.secret });
      return {
        user: payload,
        access_token: token
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  @Post()
  async checkUser(@Body() data, @Res() res: Response) {
    console.log("checkUser data: ", data);

    if (!Object.keys(data).length) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    if (data.token) {
      try {
        const payload = await this.jwtService.verify(data.token, { secret: jwtConstants.secret });
        console.log({ payload });
        return {
          user: payload,
          access_token: data.token
        };
      } catch (err) {
        throw new UnauthorizedException();
      }
    }

    const user = await this.userService.findByEmail(data.email);

    if (user && data.password) {
      console.log("compare password");
      bcrypt.compare(data.password, user.password, async (err, result) => {
        if (err) {
          throw (err);
        }
        if (result) {
          const userWithoutPass = { ...user, password: null };
          res.status(HttpStatus.OK).json({
            user: userWithoutPass,
            access_token: this.jwtService.sign(userWithoutPass)
          });
        } else {
          res.status(HttpStatus.UNAUTHORIZED).json(Messages.InvalidPassword);
        }
      });
    } else {
      res.status(HttpStatus.NOT_FOUND).json(Messages.UserNotFound);
    }
  }

}
