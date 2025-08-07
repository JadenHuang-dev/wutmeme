import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum MemeLanguage {
  ENGLISH = 'en',
  CHINESE = 'zh',
  JAPANESE = 'ja',
}

@Entity()
export class Meme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: MemeLanguage, default: MemeLanguage.CHINESE })
  language: MemeLanguage;

  @Column()
  term: string;

  @Column({ type: 'text' })
  explanation: string;

  @Column({ nullable: true })
  referenceUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
