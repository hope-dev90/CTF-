import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LearnEntry } from './learn.entity';
import { CreateLearnDto } from './dto/create-learn.dto';
import { UpdateLearnDto } from './dto/update-learn.dto';

@Injectable()
export class LearnService {
  constructor(
    @InjectRepository(LearnEntry)
    private readonly repo: Repository<LearnEntry>,
  ) {}

  async create(dto: CreateLearnDto): Promise<LearnEntry> {
    const entry = this.repo.create(dto);
    return this.repo.save(entry);
  }

  async findAll(): Promise<LearnEntry[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<LearnEntry> {
    const entry = await this.repo.findOne({ where: { id } });
    if (!entry) throw new NotFoundException(`Learn entry with id "${id}" not found`);
    return entry;
  }

  async update(id: string, dto: UpdateLearnDto): Promise<LearnEntry> {
    const entry = await this.findOne(id);
    Object.assign(entry, dto);
    return this.repo.save(entry);
  }

  async remove(id: string): Promise<void> {
    const entry = await this.findOne(id);
    await this.repo.remove(entry);
  }
}
