import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './chat.entity';
import { OpenAIService } from './openai.service';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly repo: Repository<ChatMessage>,
    private readonly openai: OpenAIService,
  ) {}

  async sendMessage(dto: SendMessageDto): Promise<ChatMessage> {
    // Fetch last 10 messages for context
    const previous = await this.repo.find({
      where: { userId: dto.userId },
      order: { createdAt: 'DESC' },
      take: 10,
    });

    // Format as OpenAI chat history (chronological)
    const chatHistory = previous
      .reverse()
      .flatMap((msg) => [
        { role: 'user' as const, content: msg.userMessage },
        { role: 'assistant' as const, content: msg.botReply },
      ]);

    const botReply = await this.openai.ask(dto.message, chatHistory);

    const saved = this.repo.create({
      userId: dto.userId,
      userMessage: dto.message,
      botReply,
    });

    return this.repo.save(saved);
  }

  async getHistory(userId: string): Promise<ChatMessage[]> {
    return this.repo.find({
      where: { userId },
      order: { createdAt: 'ASC' },
    });
  }
}
