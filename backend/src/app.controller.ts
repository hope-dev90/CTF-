import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      success: true,
      message: 'CTF Knowledge Hub API is running',
      docs: '/api',
    };
  }
}
