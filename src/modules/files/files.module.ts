import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { Notes } from "../entities/notes.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Notes])],
  exports: [TypeOrmModule],
  providers: [FilesService],
  controllers: [FilesController]
})
export class FilesModule {
}
