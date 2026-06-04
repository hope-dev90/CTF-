import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PicoctfEntry } from './picoctf.entity';
import { CreatePicoctfDto } from './dto/create-picoctf.dto';
import { UpdatePicoctfDto } from './dto/update-picoctf.dto';

@Injectable()
export class PicoctfService {
  constructor(
    @InjectRepository(PicoctfEntry)
    private readonly repo: Repository<PicoctfEntry>,
  ) {}

  async create(dto: CreatePicoctfDto): Promise<PicoctfEntry> {
    const entry = this.repo.create(dto);
    return this.repo.save(entry);
  }

  async findAll(): Promise<PicoctfEntry[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<PicoctfEntry> {
    const entry = await this.repo.findOne({ where: { id } });
    if (!entry) throw new NotFoundException(`PicoCTF entry with id "${id}" not found`);
    return entry;
  }

  async update(id: string, dto: UpdatePicoctfDto): Promise<PicoctfEntry> {
    const entry = await this.findOne(id);
    Object.assign(entry, dto);
    return this.repo.save(entry);
  }

  async remove(id: string): Promise<void> {
    const entry = await this.findOne(id);
    await this.repo.remove(entry);
  }
}
