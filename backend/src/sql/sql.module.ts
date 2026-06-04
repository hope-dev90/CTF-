import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqlEntry } from './sql.entity';
import { SqlService } from './sql.service';
import { SqlController } from './sql.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SqlEntry])],
  providers: [SqlService],
  controllers: [SqlController],
})
export class SqlModule {}
