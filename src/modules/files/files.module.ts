import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  providers: [FilesService],
  controllers: [FilesController]
})
export class FilesModule {
}
