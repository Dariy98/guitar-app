import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterController } from './register.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  providers: [UsersService],
  controllers: [RegisterController],
})
export class RegisterModule {
}