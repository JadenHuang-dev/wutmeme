import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum MemeLanguage {
  ENGLISH = 'en',
  CHINESE = 'zh',
  JAPANESE = 'ja',
}

@Entity()
export class Meme {
  @ApiProperty({ description: '模因ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    enum: MemeLanguage,
    default: MemeLanguage.CHINESE,
    description: '模因语言',
  })
  @Column({ type: 'enum', enum: MemeLanguage, default: MemeLanguage.CHINESE })
  language: MemeLanguage;

  @ApiProperty({ description: '模因术语或短语' })
  @Column()
  term: string;

  @ApiProperty({ description: '模因解释' })
  @Column({ type: 'text' })
  explanation: string;

  @ApiProperty({ required: false, description: '参考链接' })
  @Column({ nullable: true })
  referenceUrl: string;

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
