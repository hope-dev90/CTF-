import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './chat.entity';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { OpenAIService } from './openai.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage])],
  providers: [ChatService, OpenAIService],
  controllers: [ChatController],
})
export class ChatModule {}
