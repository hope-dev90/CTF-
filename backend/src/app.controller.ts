import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  getRoot() {
    return {
      success: true,
      message: 'CTF Knowledge Hub API is running',
      docs: '/api',
    };
  }
}
