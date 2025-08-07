import { Controller, Get, Post, Body } from '@nestjs/common';
import { MemeService } from '../service/meme.service';
import { Meme } from '../entities/meme.entity';

@Controller('memes')
export class MemeController {
  constructor(private readonly memeService: MemeService) {}

  @Get()
  getAll(): Promise<Meme[]> {
    return this.memeService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Meme>): Promise<Meme> {
    return this.memeService.create(data);
  }
}
