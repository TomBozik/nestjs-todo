import { IsInt, IsNotEmpty } from 'class-validator';

export class addUserToListDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  listId: number;
}
