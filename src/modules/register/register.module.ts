import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { UsersService } from "../users/users.service";
import { RegisterController } from "./register.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../constants/constants";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.shelfLife }
    })],
  exports: [TypeOrmModule],
  providers: [UsersService],
  controllers: [RegisterController]
})
export class RegisterModule {
}
