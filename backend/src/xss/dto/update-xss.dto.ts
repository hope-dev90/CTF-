import { PartialType } from '@nestjs/mapped-types';
import { CreateXssDto } from './create-xss.dto';

export class UpdateXssDto extends PartialType(CreateXssDto) {}
