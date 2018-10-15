import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  @Get()
  async index(@Query() query) {
    return await User.find();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return await user.save();
  }

  @Get(':id')
  async show(@Param('id') id) {
    return await User.findOne({ id });
  }

  @Put(':id')
  async update(@Param('id') id, @Body() updateUserDto: CreateUserDto) {
    const user = await User.findOne({ id });

    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;

    return await user.save();
  }

  @Delete(':id')
  async destroy(@Param('id') id) {
    const user = await User.findOne({ id });

    return await user.remove();
  }

}