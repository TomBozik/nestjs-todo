import { IsNotEmpty, IsString } from 'class-validator';

export class createListDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
