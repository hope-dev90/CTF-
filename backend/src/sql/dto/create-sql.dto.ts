import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSqlDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  payload: string;

  @IsOptional()
  @IsString()
  dbType?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
