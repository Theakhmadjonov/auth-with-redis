import { IsPhoneNumber, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  username: string;
  @IsString()
  @IsPhoneNumber()
  phone: string;
}
