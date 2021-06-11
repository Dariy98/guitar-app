import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(user: User): Promise<User> {
    console.log('createUser user: ', user);
    return this.usersRepository.save(user);
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async removeUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updateUser(id: string, user: User): Promise<void> {
    await this.usersRepository.update(id, user);
  }
}
