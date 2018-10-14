import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  index() {
    return 'test';
  }

  @Post()
  create() {
    return 'test';
  }

  @Get(':id')
  show(@Param('id') id) {
    return 'test';
  }

  @Put(':id')
  update(@Param('id') id) {
    return 'test';
  }

  @Delete(':id')
  destroy(@Param('id') id) {
    return true;
  }

}