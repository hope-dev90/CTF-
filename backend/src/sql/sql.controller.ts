import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SqlService } from './sql.service';
import { CreateSqlDto } from './dto/create-sql.dto';
import { UpdateSqlDto } from './dto/update-sql.dto';

@Controller('sql')
export class SqlController {
  constructor(private readonly sqlService: SqlService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateSqlDto) {
    const data = await this.sqlService.create(dto);
    return { success: true, data, message: 'SQL entry created' };
  }

  @Get()
  async findAll() {
    const data = await this.sqlService.findAll();
    return { success: true, data, message: 'SQL entries retrieved' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.sqlService.findOne(id);
    return { success: true, data, message: 'SQL entry retrieved' };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSqlDto) {
    const data = await this.sqlService.update(id, dto);
    return { success: true, data, message: 'SQL entry updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.sqlService.remove(id);
    return { success: true, data: null, message: 'SQL entry deleted' };
  }
}
