import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { MemeService } from '../service/meme.service';
import { Meme } from '../entities/meme.entity';
import { CreateMemeDto } from '../dto/meme.dto';

@ApiTags('memes')
@Controller('memes')
export class MemeController {
  constructor(private readonly memeService: MemeService) {}

  @Get()
  @ApiOperation({ summary: '获取所有模因' })
  @ApiResponse({ status: 200, description: '返回所有模因', type: [Meme] })
  getAll(): Promise<Meme[]> {
    return this.memeService.findAll();
  }

  @Post()
  @ApiOperation({ summary: '创建新的模因' })
  @ApiBody({ type: CreateMemeDto })
  @ApiResponse({ status: 201, description: '模因已创建', type: Meme })
  create(@Body() data: Partial<Meme>): Promise<Meme> {
    return this.memeService.create(data);
  }
}
