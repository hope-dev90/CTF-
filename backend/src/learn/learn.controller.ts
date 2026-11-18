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
  UseGuards,
} from '@nestjs/common';
import { LearnService } from './learn.service';
import { CreateLearnDto } from './dto/create-learn.dto';
import { UpdateLearnDto } from './dto/update-learn.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('learn')
@Controller('learn')
export class LearnController {
  constructor(private readonly learnService: LearnService) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new learn entry (admin only)' })
  @ApiResponse({ status: 201, description: 'Learn entry created successfully' })
  async create(@Body() dto: CreateLearnDto) {
    const data = await this.learnService.create(dto);
    return { success: true, data, message: 'Learn entry created' };
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all learn entries' })
  @ApiResponse({ status: 200, description: 'Learn entries retrieved' })
  async findAll() {
    const data = await this.learnService.findAll();
    return { success: true, data, message: 'Learn entries retrieved' };
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a single learn entry' })
  @ApiResponse({ status: 200, description: 'Learn entry retrieved' })
  async findOne(@Param('id') id: string) {
    const data = await this.learnService.findOne(id);
    return { success: true, data, message: 'Learn entry retrieved' };
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a learn entry (admin only)' })
  @ApiResponse({ status: 200, description: 'Learn entry updated' })
  async update(@Param('id') id: string, @Body() dto: UpdateLearnDto) {
    const data = await this.learnService.update(id, dto);
    return { success: true, data, message: 'Learn entry updated' };
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a learn entry (admin only)' })
  @ApiResponse({ status: 200, description: 'Learn entry deleted' })
  async remove(@Param('id') id: string) {
    await this.learnService.remove(id);
    return { success: true, data: null, message: 'Learn entry deleted' };
  }
}
