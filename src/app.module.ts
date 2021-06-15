import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./modules/users/users.module";
import { Connection } from "typeorm";
import { RegisterModule } from "./modules/register/register.module";
import { LoginModule } from "./modules/login/login.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    RegisterModule,
    LoginModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor(private connection: Connection) {
  }
}
