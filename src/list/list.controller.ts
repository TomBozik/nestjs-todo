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
import { addUserToListDto } from './dto/add-user-to-list.dto';
import { ListService } from './list.service';

@Controller('lists')
export class ListController {
  constructor(private listService: ListService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  createList(@GetUser('userId') userId: number, @Body() dto: createListDto) {
    return this.listService.createList(userId, dto);
  }

  @Get()
  getAllLists() {
    return this.listService.getAllLists();
  }

  @Get(':id')
  getListById(@Param('id', ParseIntPipe) listId: number) {
    return this.listService.getListById(listId);
  }

  @UseGuards(JwtGuard)
  @Post('add-user')
  addUserToList(
    @GetUser('userId') userId: number,
    @Body() dto: addUserToListDto,
  ) {
    return this.listService.addUserToList(userId, dto);
  }
}
