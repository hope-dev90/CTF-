import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({ summary: 'Send a message to the chatbot' })
  @ApiResponse({ status: 201, description: 'Message sent successfully' })
  async sendMessage(@Body() dto: SendMessageDto) {
    const data = await this.chatService.sendMessage(dto);
    return { success: true, data, message: 'Message sent' };
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get chat history for a user' })
  @ApiResponse({ status: 200, description: 'Chat history retrieved' })
  async getHistory(@Param('userId') userId: string) {
    const data = await this.chatService.getHistory(userId);
    return { success: true, data, message: 'Chat history retrieved' };
  }
}
