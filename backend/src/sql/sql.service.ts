import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SqlEntry } from './sql.entity';
import { CreateSqlDto } from './dto/create-sql.dto';
import { UpdateSqlDto } from './dto/update-sql.dto';

@Injectable()
export class SqlService {
  constructor(
    @InjectRepository(SqlEntry)
    private readonly repo: Repository<SqlEntry>,
  ) {}

  async create(dto: CreateSqlDto): Promise<SqlEntry> {
    const entry = this.repo.create(dto);
    return this.repo.save(entry);
  }

  async findAll(): Promise<SqlEntry[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<SqlEntry> {
    const entry = await this.repo.findOne({ where: { id } });
    if (!entry) throw new NotFoundException(`SQL entry with id "${id}" not found`);
    return entry;
  }

  async update(id: string, dto: UpdateSqlDto): Promise<SqlEntry> {
    const entry = await this.findOne(id);
    Object.assign(entry, dto);
    return this.repo.save(entry);
  }

  async remove(id: string): Promise<void> {
    const entry = await this.findOne(id);
    await this.repo.remove(entry);
  }
}
