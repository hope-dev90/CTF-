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
import { PicoctfService } from './picoctf.service';
import { CreatePicoctfDto } from './dto/create-picoctf.dto';
import { UpdatePicoctfDto } from './dto/update-picoctf.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('picoctf')
@Controller('picoctf')
export class PicoctfController {
  constructor(private readonly picoctfService: PicoctfService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new PicoCTF entry' })
  @ApiResponse({ status: 201, description: 'PicoCTF entry created successfully' })
  async create(@Body() dto: CreatePicoctfDto) {
    const data = await this.picoctfService.create(dto);
    return { success: true, data, message: 'PicoCTF entry created' };
  }

  @Get()
  @ApiOperation({ summary: 'Get all PicoCTF entries' })
  @ApiResponse({ status: 200, description: 'PicoCTF entries retrieved' })
  async findAll() {
    const data = await this.picoctfService.findAll();
    return { success: true, data, message: 'PicoCTF entries retrieved' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single PicoCTF entry' })
  @ApiResponse({ status: 200, description: 'PicoCTF entry retrieved' })
  async findOne(@Param('id') id: string) {
    const data = await this.picoctfService.findOne(id);
    return { success: true, data, message: 'PicoCTF entry retrieved' };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a PicoCTF entry' })
  @ApiResponse({ status: 200, description: 'PicoCTF entry updated' })
  async update(@Param('id') id: string, @Body() dto: UpdatePicoctfDto) {
    const data = await this.picoctfService.update(id, dto);
    return { success: true, data, message: 'PicoCTF entry updated' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a PicoCTF entry' })
  @ApiResponse({ status: 200, description: 'PicoCTF entry deleted' })
  async remove(@Param('id') id: string) {
    await this.picoctfService.remove(id);
    return { success: true, data: null, message: 'PicoCTF entry deleted' };
  }
}
