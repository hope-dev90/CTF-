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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('sql')
@Controller('sql')
export class SqlController {
  constructor(private readonly sqlService: SqlService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new SQL entry' })
  @ApiResponse({ status: 201, description: 'SQL entry created successfully' })
  async create(@Body() dto: CreateSqlDto) {
    const data = await this.sqlService.create(dto);
    return { success: true, data, message: 'SQL entry created' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all SQL entries' })
  @ApiResponse({ status: 200, description: 'SQL entries retrieved' })
  async findAll() {
    const data = await this.sqlService.findAll();
    return { success: true, data, message: 'SQL entries retrieved' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single SQL entry' })
  @ApiResponse({ status: 200, description: 'SQL entry retrieved' })
  async findOne(@Param('id') id: string) {
    const data = await this.sqlService.findOne(id);
    return { success: true, data, message: 'SQL entry retrieved' };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a SQL entry' })
  @ApiResponse({ status: 200, description: 'SQL entry updated' })
  async update(@Param('id') id: string, @Body() dto: UpdateSqlDto) {
    const data = await this.sqlService.update(id, dto);
    return { success: true, data, message: 'SQL entry updated' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a SQL entry' })
  @ApiResponse({ status: 200, description: 'SQL entry deleted' })
  async remove(@Param('id') id: string) {
    await this.sqlService.remove(id);
    return { success: true, data: null, message: 'SQL entry deleted' };
  }
}
