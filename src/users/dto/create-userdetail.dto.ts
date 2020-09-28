import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserdetailDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
