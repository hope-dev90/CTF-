import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePicoctfDto {
  @IsNotEmpty()
  @IsString()
  challengeName: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  difficulty?: string;

  @IsNotEmpty()
  @IsString()
  writeup: string;

  @IsOptional()
  @IsString()
  flag?: string;
}
