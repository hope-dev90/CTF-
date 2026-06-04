import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XssEntry } from './xss.entity';
import { XssService } from './xss.service';
import { XssController } from './xss.controller';

@Module({
  imports: [TypeOrmModule.forFeature([XssEntry])],
  providers: [XssService],
  controllers: [XssController],
})
export class XssModule {}
