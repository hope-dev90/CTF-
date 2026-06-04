import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('picoctf_entries')
export class PicoctfEntry {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  challengeName: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  category: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  difficulty: string;

  @ApiProperty()
  @Column('text')
  writeup: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  flag: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
