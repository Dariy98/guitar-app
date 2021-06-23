import { Body, Controller, HttpStatus, Post, Res, UploadedFiles } from "@nestjs/common";
// import { FilesInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { UseInterceptors, UploadedFile } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";
import { FilesService } from "./files.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

@Controller("upload")
export class FilesController {
  constructor(
    private filesService: FilesService
  ) {
  }

  @Post()
  @UseInterceptors(FilesInterceptor("file"))
  uploadFile(@Body() body, @UploadedFiles() files: Express.Multer.File[], @Res() res: Response) {
    console.log("files", files);
    console.log("body", body);
    res.status(HttpStatus.OK).json({
      body: body, //TODO
      file: files[0].buffer.toString() //TODO
    });
  }

  // @Post()
  // @UseInterceptors(FileInterceptor("file",
  //   {
  //     storage: diskStorage({
  //       destination: "./upload",
  //       filename: (req, file, cb) => {
  //         const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join("");
  //         return cb(null, `${randomName}${extname(file.originalname)}`);
  //       }
  //     })
  //   }
  //   )
  // )
  // async uploadAvatar(@UploadedFile() file) {
  //   console.log("test file", file);
  //   const noteData = {
  //     id: 123,
  //     title: 'qwe test',
  //     images: file,
  //   }
  //   const savingData = await this.filesService.saveNotesData(noteData);
  //   console.log("savingData", savingData);
  // }

}
