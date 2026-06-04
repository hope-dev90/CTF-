import { Module } from '@nestjs/common';
import { XssService } from './xss.service';
import { XssController } from './xss.controller';

@Module({
  providers: [XssService],
  controllers: [XssController]
})
export class XssModule {}
