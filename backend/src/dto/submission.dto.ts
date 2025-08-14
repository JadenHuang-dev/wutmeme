import { ApiProperty } from '@nestjs/swagger';

export class CreateSubmissionDto {
  @ApiProperty({ description: '文本内容', required: false })
  textContent?: string;

  @ApiProperty({ description: '图片URL', required: false })
  imageUrl?: string;

  @ApiProperty({ description: '视频URL', required: false })
  videoUrl?: string;
}

export class SubmissionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  textContent?: string;

  @ApiProperty({ required: false })
  imageUrl?: string;

  @ApiProperty({ required: false })
  videoUrl?: string;

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;

  @ApiProperty({ description: '删除时间', required: false })
  deletedAt?: Date;
}
