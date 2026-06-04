import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XssModule } from './xss/xss.module';
import { SqlModule } from './sql/sql.module';
import { LearnModule } from './learn/learn.module';
import { PicoctfModule } from './picoctf/picoctf.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: 'db.sqlite',
        autoLoadEntities: true,
        synchronize: true,
      }) as any,
    }),
    XssModule,
    SqlModule,
    LearnModule,
    PicoctfModule,
    ChatModule,
  ],
})
export class AppModule {}
