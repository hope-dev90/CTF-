import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { XssEntry } from './xss.entity';
import { CreateXssDto } from './dto/create-xss.dto';
import { UpdateXssDto } from './dto/update-xss.dto';

@Injectable()
export class XssService {
  constructor(
    @InjectRepository(XssEntry)
    private readonly repo: Repository<XssEntry>,
  ) {}

  async create(dto: CreateXssDto): Promise<XssEntry> {
    const entry = this.repo.create(dto);
    return this.repo.save(entry);
  }

  async findAll(): Promise<XssEntry[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<XssEntry> {
    const entry = await this.repo.findOne({ where: { id } });
    if (!entry) throw new NotFoundException(`XSS entry with id "${id}" not found`);
    return entry;
  }

  async update(id: string, dto: UpdateXssDto): Promise<XssEntry> {
    const entry = await this.findOne(id);
    Object.assign(entry, dto);
    return this.repo.save(entry);
  }

  async remove(id: string): Promise<void> {
    const entry = await this.findOne(id);
    await this.repo.remove(entry);
  }
}
