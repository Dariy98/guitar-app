import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {
  }

  // getUsers(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }

  async createUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email: email });
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
    const queryBuilder = this.usersRepository.createQueryBuilder("c");
    queryBuilder.orderBy("id", "DESC"); // Or whatever you need to do
    return paginate<User>(queryBuilder, options);
  }

  // findOne(id: string): Promise<User> {
  //   return this.usersRepository.findOne(id);
  // }
  //
  // async removeUser(id: string): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
  //
  // async updateUser(id: string, user: User): Promise<void> {
  //   await this.usersRepository.update(id, user);
  // }
}
