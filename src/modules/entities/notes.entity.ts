import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("blob", { nullable: true })
  images: Blob[];
}
