import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "../entities/user.entity";
import { Pagination } from "nestjs-typeorm-paginate";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {
  }

  @Get("")
  async index(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
  ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.paginate({
      page,
      limit,
      route: "/users"
    });
  }

  // @Get()
  // getAll(): Promise<User[]> {
  //   return this.userService.getUsers();
  // }
  //
  // @Get(':id')
  // getOne(@Param('id') id: string): Promise<User> {
  //   return this.userService.findOne(id);
  // }
  //
  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // createUser(@Body() user: User) {
  //   return this.userService.createUser(user);
  // }
  //
  // @Delete(':id')
  // delete(@Param('id') id: string): Promise<void> {
  //   return this.userService.removeUser(id);
  // }
  //
  // @Put(':id')
  // update(@Body() user: User, @Param('id') id: string): Promise<void> {
  //   return this.userService.updateUser(id, user);
  // }
}
