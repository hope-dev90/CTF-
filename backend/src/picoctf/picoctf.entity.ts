import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('picoctf_entries')
export class PicoctfEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  challengeName: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  difficulty: string;

  @Column('text')
  writeup: string;

  @Column({ nullable: true })
  flag: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
