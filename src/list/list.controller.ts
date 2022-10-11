import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { createListDto } from './dto';
import { ListService } from './list.service';

@Controller('lists')
export class ListController {
  constructor(private listService: ListService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  createList(@GetUser('email') email: string, @Body() dto: createListDto) {
    console.log(email);
    console.log(dto);
    return 'OK';
  }

  @Get()
  getAllLists() {}

  @Get(':id')
  getListById(@Param('id', ParseIntPipe) listId: number) {
    console.log(listId);
    return 'OK';
  }
}
