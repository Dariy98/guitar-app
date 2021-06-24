import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Level } from "../constants/constants";

@Entity()
export class Notes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  genre: string;

  @Column()
  class: string;

  @Column()
  level: Level;

  @Column()
  files: string;
}
