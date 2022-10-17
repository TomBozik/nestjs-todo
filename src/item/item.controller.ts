import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { createItemDto } from './dto/create-item.dto';
import { updateItemDto } from './dto/update-item.dto';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @UseGuards(JwtGuard)
  @Post()
  createItem(@GetUser('userId') userId: number, @Body() dto: createItemDto) {
    return this.itemService.createItem(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch()
  updateItem(@GetUser('userId') userId: number, @Body() dto: updateItemDto) {
    return this.itemService.updateItem(userId, dto);
  }
}
