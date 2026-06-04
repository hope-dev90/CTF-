import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateXssDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  payload: string;

  @IsOptional()
  @IsString()
  technique?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
