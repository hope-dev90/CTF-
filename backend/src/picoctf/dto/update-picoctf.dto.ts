import { PartialType } from '@nestjs/mapped-types';
import { CreatePicoctfDto } from './create-picoctf.dto';

export class UpdatePicoctfDto extends PartialType(CreatePicoctfDto) {}
