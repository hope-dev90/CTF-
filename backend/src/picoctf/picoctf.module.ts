import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PicoctfEntry } from './picoctf.entity';
import { PicoctfService } from './picoctf.service';
import { PicoctfController } from './picoctf.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PicoctfEntry])],
  providers: [PicoctfService],
  controllers: [PicoctfController],
})
export class PicoctfModule {}
