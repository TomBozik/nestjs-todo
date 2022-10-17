import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ItemState } from '../enum';

export class updateItemDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  deadline: Date;

  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsInt()
  listId: number;

  @IsEnum(ItemState)
  @IsNotEmpty()
  state: ItemState;
}
