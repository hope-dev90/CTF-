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

@Controller('picoctf')
export class PicoctfController {
  constructor(private readonly picoctfService: PicoctfService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreatePicoctfDto) {
    const data = await this.picoctfService.create(dto);
    return { success: true, data, message: 'PicoCTF entry created' };
  }

  @Get()
  async findAll() {
    const data = await this.picoctfService.findAll();
    return { success: true, data, message: 'PicoCTF entries retrieved' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.picoctfService.findOne(id);
    return { success: true, data, message: 'PicoCTF entry retrieved' };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePicoctfDto) {
    const data = await this.picoctfService.update(id, dto);
    return { success: true, data, message: 'PicoCTF entry updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.picoctfService.remove(id);
    return { success: true, data: null, message: 'PicoCTF entry deleted' };
  }
}
