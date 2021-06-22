import { Body, Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("upload")
export class FilesController {
  constructor() {
  }

  @Post()
  @UseInterceptors(FilesInterceptor("file"))
  uploadFile(@Body() body, @UploadedFiles() file: Express.Multer.File) {
    console.log("file", file);
    console.log("body", body);
    return {
      body: body,
      file: file[0].buffer.toString()
    };
  }

}
