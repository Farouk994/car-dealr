import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dtos';
import { UsersService } from './users.service';

// ("auth")
// /users/?
// Used as a prefix for all the different route handlers we define inside this class
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  //   Validate incoming body against the createUserDto
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
    console.log(body);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }
  // @Patch()

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }
}
