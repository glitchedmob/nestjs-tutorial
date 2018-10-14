import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CreateUserDto } from './create-user.dto';

@Controller('user')
export class UserController {
  @Get()
  index(@Query() query) {

  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {

  }

  @Get(':id')
  show(@Param('id') id) {

  }

  @Put(':id')
  update(@Param('id') id, @Body() updateUserDto) {

  }

  @Delete(':id')
  destroy(@Param('id') id) {

  }

}