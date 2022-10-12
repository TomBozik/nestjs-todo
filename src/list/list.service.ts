import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { List } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { createListDto } from './dto';
import { addUserToListDto } from './dto/add-user-to-list.dto';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async createList(userId: number, dto: createListDto): Promise<List> {
    const list = await this.prisma.list.create({
      data: {
        ...dto,
        users: {
          connect: { id: userId },
        },
      },
    });
    return list;
  }

  async getAllLists(): Promise<List[]> {
    return await this.prisma.list.findMany({
      include: {
        users: {
          select: {
            id: true,
            email: true,
          },
        },
        items: true,
      },
    });
  }

  async getListById(id: number): Promise<List> {
    const list = await this.prisma.list.findFirst({
      where: {
        id,
      },
    });

    if (!list) throw new BadRequestException('Resource not found');

    return list;
  }

  async addUserToList(userId: number, dto: addUserToListDto): Promise<List> {
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

    const user = await this.prisma.user.findFirst({
      where: {
        id: dto.userId,
      },
    });

    if (!list || !user) throw new BadRequestException('Resource not found');

    let usersInList: number[] = [];
    list.users.forEach((user) => {
      usersInList.push(user.id);
    });

    if (!usersInList.includes(userId))
      throw new UnauthorizedException('Unauthorized');

    if (usersInList.includes(dto.userId))
      throw new BadRequestException('User already in list');

    return await this.prisma.list.update({
      where: { id: dto.listId },
      data: {
        users: {
          connect: [{ id: dto.userId }],
        },
      },
    });
  }
}
