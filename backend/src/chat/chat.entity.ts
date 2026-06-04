import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('chat_messages')
export class ChatMessage {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  userId: string;

  @ApiProperty()
  @Column('text')
  userMessage: string;

  @ApiProperty()
  @Column('text')
  botReply: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
