import { ApiProperty } from '@nestjs/swagger';
import { MemeLanguage } from '../entities/meme.entity';

export class CreateMemeDto {
  @ApiProperty({
    enum: MemeLanguage,
    default: MemeLanguage.CHINESE,
    description: '模因语言',
  })
  language: MemeLanguage;

  @ApiProperty({ description: '模因术语或短语' })
  term: string;

  @ApiProperty({ description: '模因解释' })
  explanation: string;

  @ApiProperty({ required: false, description: '参考链接' })
  referenceUrl?: string;
}

export class MemeResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ enum: MemeLanguage })
  language: MemeLanguage;

  @ApiProperty()
  term: string;

  @ApiProperty()
  explanation: string;

  @ApiProperty({ required: false })
  referenceUrl?: string;

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;

  @ApiProperty({ description: '删除时间', required: false })
  deletedAt?: Date;
}
