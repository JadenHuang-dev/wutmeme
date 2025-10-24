import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';
import { MemeAnalysisPrompts } from '../prompts/meme-analysis.prompts';

export interface MemeDetectionResult {
  term: string;
  explanation: string;
  referenceUrl?: string;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private ai: GoogleGenAI;
  private isConfigured: boolean = false;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GOOGLE_AI_API_KEY');

    if (!apiKey || apiKey === 'your_google_ai_studio_api_key_here') {
      this.logger.warn('Google AI API key not configured. Using mock data.');
      return;
    }

    try {
      // 設置環境變數，因為新的 SDK 會從這裡讀取
      process.env.GEMINI_API_KEY = apiKey;
      this.ai = new GoogleGenAI({});
      this.isConfigured = true;
      this.logger.log('Google AI service initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize Google AI service', error);
    }
  }

  /**
   * 分析文本內容，檢測其中的網路梗和流行用語
   */
  async analyzeTextForMemes(text: string): Promise<MemeDetectionResult[]> {
    if (!this.isConfigured) {
      this.logger.warn('Google AI not configured, returning empty array');
      return [];
    }

    try {
      const prompt = MemeAnalysisPrompts.buildTextAnalysisPrompt(text);
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return this.parseAIResponse(response.text || '');
    } catch (error) {
      this.logger.error('Error analyzing text for memes:', error);
      return [];
    }
  }

  /**
   * 分析圖片內容，檢測其中的網路梗
   */
  async analyzeImageForMemes(imageUrl: string): Promise<MemeDetectionResult[]> {
    if (!this.isConfigured) {
      this.logger.warn('Google AI not configured, returning empty array');
      return [];
    }

    try {
      // 對於圖片分析，我們暫時返回基於URL的文本分析
      // 實際的圖片分析需要不同的 API 調用方式
      this.logger.warn(
        'Image analysis not fully implemented, analyzing URL as text',
      );
      return this.analyzeTextForMemes(`圖片URL: ${imageUrl}`);
    } catch (error) {
      this.logger.error('Error analyzing image for memes:', error);
      return [];
    }
  }

  /**
   * 分析視頻鏈接，檢測相關的網路梗
   */
  async analyzeVideoForMemes(videoUrl: string): Promise<MemeDetectionResult[]> {
    if (!this.isConfigured) {
      this.logger.warn('Google AI not configured, returning empty array');
      return [];
    }

    try {
      const prompt = MemeAnalysisPrompts.buildVideoAnalysisPrompt(videoUrl);
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return this.parseAIResponse(response.text || '');
    } catch (error) {
      this.logger.error('Error analyzing video for memes:', error);
      return [];
    }
  }

  /**
   * 解析AI返回的響應
   */
  private parseAIResponse(responseText: string): MemeDetectionResult[] {
    try {
      // 嘗試提取JSON內容
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const jsonStr = jsonMatch[0];
        const parsed = JSON.parse(jsonStr) as any[];

        if (Array.isArray(parsed)) {
          return parsed
            .filter((item: any) => {
              return (
                item &&
                typeof item === 'object' &&
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                typeof item.term === 'string' &&
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                typeof item.explanation === 'string' &&
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                item.term.length > 0 &&
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                item.explanation.length > 0
              );
            })
            .map((item: any) => ({
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              term: item.term as string,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              explanation: item.explanation as string,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              referenceUrl: item.referenceUrl as string | undefined,
            }));
        }
      }

      // 如果無法解析JSON，嘗試簡單的文本解析
      return this.parseSimpleTextResponse(responseText);
    } catch (error) {
      this.logger.error('Error parsing AI response:', error);
      return [];
    }
  }

  /**
   * 簡單文本解析（備用方法）
   */
  private parseSimpleTextResponse(text: string): MemeDetectionResult[] {
    // 這是一個簡化的解析方法，用於處理非JSON響應
    const lines = text.split('\n').filter((line) => line.trim());
    const results: MemeDetectionResult[] = [];

    let currentTerm = '';
    let currentExplanation = '';

    for (const line of lines) {
      if (
        line.includes('梗') ||
        line.includes('meme') ||
        line.includes('term')
      ) {
        if (currentTerm && currentExplanation) {
          results.push({
            term: currentTerm,
            explanation: currentExplanation,
          });
        }
        currentTerm = line.replace(/^.*?[:：]/, '').trim();
        currentExplanation = '';
      } else if (currentTerm && line.trim()) {
        currentExplanation += line.trim() + ' ';
      }
    }

    if (currentTerm && currentExplanation) {
      results.push({
        term: currentTerm,
        explanation: currentExplanation.trim(),
      });
    }

    return results;
  }
}
