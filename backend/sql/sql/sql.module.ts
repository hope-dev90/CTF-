import { Module } from '@nestjs/common';
import { SqlService } from './sql.service';
import { SqlController } from './sql.controller';

@Module({
  providers: [SqlService],
  controllers: [SqlController]
})
export class SqlModule {}
