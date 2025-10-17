import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from '../entities/submission.entity';
import { Meme } from '../entities/meme.entity';
import { MemeService } from './meme.service';
import { AiService, MemeDetectionResult } from './ai.service';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepo: Repository<Submission>,
    @InjectRepository(Meme)
    private readonly memeRepo: Repository<Meme>,
    private readonly memeService: MemeService,
    private readonly aiService: AiService,
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

  // 檢測提交中的memes（使用Google AI Studio API）
  private async detectMemes(submission: Submission): Promise<Meme[]> {
    let aiResults: MemeDetectionResult[] = [];

    try {
      // 根據提交類型選擇相應的分析方法
      if (submission.textContent) {
        aiResults = await this.aiService.analyzeTextForMemes(
          submission.textContent,
        );
      } else if (submission.imageUrl) {
        aiResults = await this.aiService.analyzeImageForMemes(
          submission.imageUrl,
        );
      } else if (submission.videoUrl) {
        aiResults = await this.aiService.analyzeVideoForMemes(
          submission.videoUrl,
        );
      }

      // 將AI檢測結果轉換為Meme實體
      const memes: Meme[] = [];
      for (const aiResult of aiResults) {
        // 檢查是否已存在相同的meme
        let meme = await this.memeRepo.findOne({
          where: { term: aiResult.term },
        });

        // 如果不存在，則創建新的meme
        if (!meme) {
          meme = await this.memeService.create({
            term: aiResult.term,
            explanation: aiResult.explanation,
            referenceUrl: aiResult.referenceUrl,
          });
        }

        memes.push(meme);
      }

      return memes;
    } catch (error) {
      console.error('Error detecting memes with AI:', error);

      // 如果AI檢測失敗，返回默認的模擬數據
      return this.getFallbackMemes();
    }
  }

  // 備用的模擬數據方法
  private async getFallbackMemes(): Promise<Meme[]> {
    const mockMemes = [
      {
        term: '梗一大哥',
        explanation:
          '"梗一大哥"是指在互聯網平台（如哔哩哔哩、快手、抖音）打開全屏模式的用戶，即打開視頻的第一個人。',
      },
      {
        term: 'look at my eyes',
        explanation:
          '一個英文短語，意為"看著我的眼睛"，常在強調重要話題或表達嚴肅情感時使用。',
      },
    ];

    const memes: Meme[] = [];
    for (const mockMeme of mockMemes) {
      let meme = await this.memeRepo.findOne({
        where: { term: mockMeme.term },
      });

      if (!meme) {
        meme = await this.memeService.create(mockMeme);
      }

      memes.push(meme);
    }

    return memes;
  }
}
