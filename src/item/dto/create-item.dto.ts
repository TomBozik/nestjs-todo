import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ItemState } from '../enum';

export class createItemDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  deadline: Date;

  @IsNotEmpty()
  @IsInt()
  listId: number;

  @IsEnum(ItemState)
  @IsNotEmpty()
  state: ItemState;
}
