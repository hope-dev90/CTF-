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
import { LearnService } from './learn.service';
import { CreateLearnDto } from './dto/create-learn.dto';
import { UpdateLearnDto } from './dto/update-learn.dto';

@Controller('learn')
export class LearnController {
  constructor(private readonly learnService: LearnService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateLearnDto) {
    const data = await this.learnService.create(dto);
    return { success: true, data, message: 'Learn entry created' };
  }

  @Get()
  async findAll() {
    const data = await this.learnService.findAll();
    return { success: true, data, message: 'Learn entries retrieved' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.learnService.findOne(id);
    return { success: true, data, message: 'Learn entry retrieved' };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateLearnDto) {
    const data = await this.learnService.update(id, dto);
    return { success: true, data, message: 'Learn entry updated' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.learnService.remove(id);
    return { success: true, data: null, message: 'Learn entry deleted' };
  }
}
