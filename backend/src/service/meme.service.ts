import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meme } from '../entities/meme.entity';

@Injectable()
export class MemeService {
  constructor(
    @InjectRepository(Meme)
    private readonly memeRepo: Repository<Meme>,
  ) {}

  async findAll(): Promise<Meme[]> {
    return this.memeRepo.find();
  }

  async create(data: Partial<Meme>): Promise<Meme> {
    return this.memeRepo.save(data);
  }
}
