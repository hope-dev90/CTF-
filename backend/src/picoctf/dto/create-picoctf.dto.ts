import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePicoctfDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  challengeName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  difficulty?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  writeup: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  flag?: string;
}
