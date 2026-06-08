import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XssModule } from './xss/xss.module';
import { SqlModule } from './sql/sql.module';
import { LearnModule } from './learn/learn.module';
import { PicoctfModule } from './picoctf/picoctf.module';
import { ChatModule } from './chat/chat.module';

const isTrue = (value?: string) => value === 'true' || value === '1';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('DATABASE_URL');
        const useSsl =
          isTrue(config.get<string>('DB_SSL')) ||
          config.get<string>('NODE_ENV') === 'production';

        return {
          type: 'postgres',
          ...(databaseUrl
            ? { url: databaseUrl }
            : {
                host: config.get<string>('DB_HOST'),
                port: Number(config.get<string>('DB_PORT') ?? 5432),
                username: config.get<string>('DB_USER'),
                password: config.get<string>('DB_PASSWORD'),
                database: config.get<string>('DB_NAME'),
              }),
          ssl: useSsl ? { rejectUnauthorized: false } : false,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    XssModule,
    SqlModule,
    LearnModule,
    PicoctfModule,
    ChatModule,
  ],
})
export class AppModule {}
