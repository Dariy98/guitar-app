import { Body, Controller, HttpStatus, Post, Res, UploadedFiles } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { UseInterceptors } from "@nestjs/common";
import { NotesService } from "./files.service";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("files")
export class FilesController {

  constructor(
    private notesService: NotesService
  ) {
  }

  @Post()
  @UseInterceptors(FilesInterceptor("file", 20,
    {
      storage: diskStorage({
        destination: "./upload",
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join("");
          return cb(null, `${randomName}${extname(file.originalname)}`);
        }
      })
    }
    )
  )
  async uploadNotes(@Body() body, @UploadedFiles() files) {
    console.log("test files", files);
    console.log("body: ", body);

    const filesPaths = [];
    files.forEach(file => {
      filesPaths.push(file.path);
    });

    await this.notesService.saveNotesData({ ...body, files: JSON.stringify(filesPaths) });

    const response = [];

    files.forEach(file => {
      const fileResponse = {
        originalName: file.originalname,
        filename: file.filename
      };
      response.push(fileResponse);
    });
    return response;
  }

}
