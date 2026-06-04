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

@Controller('xss')
export class XssController {
  constructor(private readonly xssService: XssService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateXssDto) {
    const data = await this.xssService.create(dto);
    return { success: true, data, message: 'XSS entry created' };
  }

  @Get()
  async findAll() {
    const data = await this.xssService.findAll();
    return { success: true, data, message: 'XSS entries retrieved' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.xssService.findOne(id);
    return { success: true, data, message: 'XSS entry retrieved' };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateXssDto) {
    const data = await this.xssService.update(id, dto);
    return { success: true, data, message: 'XSS entry updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.xssService.remove(id);
    return { success: true, data: null, message: 'XSS entry deleted' };
  }
}
