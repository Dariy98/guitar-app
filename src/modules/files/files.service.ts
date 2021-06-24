import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notes } from "../entities/notes.entity";

export class NotesService {
  constructor(
    @InjectRepository(Notes)
    private notesRepository: Repository<Notes>
  ) {
  }

  getAllData(): Promise<Notes[]> {
    return this.notesRepository.find();
  }

  // async findByKey(email: string): Promise<User> {
  //   return this.notesRepository.findOne({ email: email });
  // }

  async saveNotesData(notes): Promise<Notes> {
    return this.notesRepository.save(notes);
  }

}
