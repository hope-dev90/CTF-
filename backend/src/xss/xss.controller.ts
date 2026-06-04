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
import { XssService } from './xss.service';
import { CreateXssDto } from './dto/create-xss.dto';
import { UpdateXssDto } from './dto/update-xss.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('xss')
@Controller('xss')
export class XssController {
  constructor(private readonly xssService: XssService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new XSS entry' })
  @ApiResponse({ status: 201, description: 'XSS entry created successfully' })
  async create(@Body() dto: CreateXssDto) {
    const data = await this.xssService.create(dto);
    return { success: true, data, message: 'XSS entry created' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all XSS entries' })
  @ApiResponse({ status: 200, description: 'XSS entries retrieved' })
  async findAll() {
    const data = await this.xssService.findAll();
    return { success: true, data, message: 'XSS entries retrieved' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single XSS entry' })
  @ApiResponse({ status: 200, description: 'XSS entry retrieved' })
  async findOne(@Param('id') id: string) {
    const data = await this.xssService.findOne(id);
    return { success: true, data, message: 'XSS entry retrieved' };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a XSS entry' })
  @ApiResponse({ status: 200, description: 'XSS entry updated' })
  async update(@Param('id') id: string, @Body() dto: UpdateXssDto) {
    const data = await this.xssService.update(id, dto);
    return { success: true, data, message: 'XSS entry updated' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a XSS entry' })
  @ApiResponse({ status: 200, description: 'XSS entry deleted' })
  async remove(@Param('id') id: string) {
    await this.xssService.remove(id);
    return { success: true, data: null, message: 'XSS entry deleted' };
  }
}
