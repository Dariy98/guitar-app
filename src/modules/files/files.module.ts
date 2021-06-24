import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesController } from "./files.controller";
import { NotesService } from "./files.service";
import { Notes } from "../entities/notes.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Notes])],
  exports: [TypeOrmModule],
  providers: [NotesService],
  controllers: [FilesController]
})
export class FilesModule {
}
