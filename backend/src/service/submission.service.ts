import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from '../entities/submission.entity';
import { Meme } from '../entities/meme.entity';
import { MemeService } from './meme.service';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepo: Repository<Submission>,
    @InjectRepository(Meme)
    private readonly memeRepo: Repository<Meme>,
    private readonly memeService: MemeService,
  ) {}

  async create(data: Partial<Submission>): Promise<Submission> {
    // 创建一个新的提交
    const submission = this.submissionRepo.create(data);

    // 检测提交中的memes（临时使用模拟数据）
    submission.detectedMemes = await this.detectMemes(submission);

    // 保存提交及其关联的memes
    return this.submissionRepo.save(submission);
  }

  async findAll(): Promise<Submission[]> {
    return this.submissionRepo.find({ relations: ['detectedMemes'] });
  }

  // 临时方法：在提交中检测memes
  private async detectMemes(submission: Submission): Promise<Meme[]> {
    // 模拟meme检测
    // 在实际应用中，这里应该调用AI服务或其他分析工具
    const mockMemes: Partial<Meme>[] = [
      {
        term: '梗一大哥',
        explanation:
          '"梗一大哥"是指在互联网平台（如哔哩哔哩、快手、抖音）打开全屏模式的用户，即打开视频的第一个人。',
      },
      {
        term: 'look at my eyes',
        explanation:
          '一个英文短语，意为"看着我的眼睛"，常在强调重要话题或表达严肃情感时使用。',
      },
      {
        term: '完了',
        explanation:
          '表示事情已经结束或无法挽回的状态，常用于表达无奈或绝望的情绪。',
      },
    ];

    // 创建或查找这些meme
    const memes: Meme[] = [];
    for (const mockMeme of mockMemes) {
      // 尝试查找现有的meme
      let meme = await this.memeRepo.findOne({
        where: { term: mockMeme.term },
      });

      // 如果不存在，则创建一个新的
      if (!meme) {
        meme = await this.memeService.create(mockMeme);
      }

      memes.push(meme);
    }

    return memes;
  }
}
