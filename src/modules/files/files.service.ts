import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notes } from "../entities/notes.entity";

export class FilesService {
  constructor(
    @InjectRepository(Notes)
    private notesRepository: Repository<Notes>
  ) {
  }

  async saveNotesData(notes: Notes): Promise<Notes> {
    return this.notesRepository.save(notes);
  }

}
