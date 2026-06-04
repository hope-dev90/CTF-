import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearnEntry } from './learn.entity';
import { LearnService } from './learn.service';
import { LearnController } from './learn.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LearnEntry])],
  providers: [LearnService],
  controllers: [LearnController],
})
export class LearnModule {}
