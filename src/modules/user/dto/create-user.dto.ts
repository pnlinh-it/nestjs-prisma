import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MinLength(5)
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  email: string;

  @MinLength(5)
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MinLength(5)
  @MaxLength(255)
  @IsString()
  @IsOptional()
  nickname?: string;
}
