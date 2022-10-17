import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { createItemDto } from './dto/create-item.dto';
import { updateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async createItem(userId: number, dto: createItemDto) {
    const list = await this.prisma.list.findFirst({
      where: {
        id: dto.listId,
      },
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!list) throw new BadRequestException('Resource not found');

    // TODO: Toto iste je aj v list service a aj v update item
    // Ziskanie listu a kontrola ci sa userId nachadza v useroch by sa mohlo robit v guard?
    let usersInList: number[] = [];
    list.users.forEach((user) => {
      usersInList.push(user.id);
    });

    if (!usersInList.includes(userId))
      throw new UnauthorizedException('Unauthorized');

    const item = await this.prisma.item.create({
      data: {
        ...dto,
        userId,
      },
    });
    return item;
  }

  async updateItem(userId: number, dto: updateItemDto) {
    const list = await this.prisma.list.findFirst({
      where: {
        id: dto.listId,
      },
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!list) throw new BadRequestException('Resource not found');

    let usersInList: number[] = [];
    list.users.forEach((user) => {
      usersInList.push(user.id);
    });

    if (!usersInList.includes(userId))
      throw new UnauthorizedException('Unauthorized');

    try {
      const item = await this.prisma.item.update({
        where: {
          id: dto.id,
        },
        data: {
          ...dto,
        },
      });
      return item;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Resource not found');
        }
      }
      throw error;
    }
  }
}
