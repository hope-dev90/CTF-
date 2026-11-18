import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'h4cker' })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  username: string;

  @ApiProperty({ example: 'secretpass' })
  @IsString()
  @MinLength(6)
  password: string;
}
