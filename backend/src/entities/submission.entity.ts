import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Meme } from './meme.entity';

@Entity()
export class Submission {
  @ApiProperty({ description: '提交ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '文本内容', required: false })
  @Column({ type: 'text', nullable: true })
  textContent: string;

  @ApiProperty({ description: '图片URL', required: false })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty({ description: '视频URL', required: false })
  @Column({ nullable: true })
  videoUrl: string;

  @ApiProperty({ description: '检测到的模因', type: () => [Meme] })
  @ManyToMany(() => Meme, { cascade: true })
  @JoinTable()
  detectedMemes: Meme[];

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: '删除时间', required: false })
  @DeleteDateColumn()
  deletedAt: Date;
}
