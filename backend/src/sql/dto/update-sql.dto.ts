import { PartialType } from '@nestjs/mapped-types';
import { CreateSqlDto } from './create-sql.dto';

export class UpdateSqlDto extends PartialType(CreateSqlDto) {}
