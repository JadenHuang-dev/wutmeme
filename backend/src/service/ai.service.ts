import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

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
      this.logger.warn('Google AI not configured, returning mock data');
      return this.getMockMemes();
    }

    try {
      const prompt = this.buildTextAnalysisPrompt(text);
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      return this.parseAIResponse(response.text || '');
    } catch (error) {
      this.logger.error('Error analyzing text for memes:', error);
      return this.getMockMemes();
    }
  }

  /**
   * 分析圖片內容，檢測其中的網路梗
   */
  async analyzeImageForMemes(imageUrl: string): Promise<MemeDetectionResult[]> {
    if (!this.isConfigured) {
      this.logger.warn('Google AI not configured, returning mock data');
      return this.getMockMemes();
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
      return this.getMockMemes();
    }
  }

  /**
   * 分析視頻鏈接，檢測相關的網路梗
   */
  async analyzeVideoForMemes(videoUrl: string): Promise<MemeDetectionResult[]> {
    if (!this.isConfigured) {
      this.logger.warn('Google AI not configured, returning mock data');
      return this.getMockMemes();
    }

    try {
      const prompt = this.buildVideoAnalysisPrompt(videoUrl);
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      return this.parseAIResponse(response.text || '');
    } catch (error) {
      this.logger.error('Error analyzing video for memes:', error);
      return this.getMockMemes();
    }
  }

  /**
   * 構建文本分析的提示詞
   */
  private buildTextAnalysisPrompt(text: string): string {
    return `
請分析以下文本中包含的網路梗、流行用語或模因內容，並以JSON格式返回結果。
每個檢測到的梗都應該包含：term（梗的名稱）、explanation（詳細解釋）、referenceUrl（參考鏈接，可選）。

文本內容：
${text}

請以以下JSON格式返回：
[
  {
    "term": "梗的名稱",
    "explanation": "詳細的解釋，包括起源、含義和使用場景",
    "referenceUrl": "相關的參考鏈接（可選）"
  }
]

注意：
1. 如果沒有檢測到任何梗，請返回空數組 []
2. 解釋要詳細且易懂
3. 優先識別中文網路梗，也要識別英文梗
4. 每個梗的解釋應該在50-200字之間
`;
  }

  /**
   * 構建圖片分析的提示詞
   */
  private buildImageAnalysisPrompt(): string {
    return `
請分析這張圖片中包含的網路梗、模因或流行文化元素，並以JSON格式返回結果。
每個檢測到的梗都應該包含：term（梗的名稱）、explanation（詳細解釋）、referenceUrl（參考鏈接，可選）。

請以以下JSON格式返回：
[
  {
    "term": "梗的名稱",
    "explanation": "詳細的解釋，包括起源、含義和使用場景",
    "referenceUrl": "相關的參考鏈接（可選）"
  }
]

注意：
1. 分析圖片中的文字、表情、姿勢、物品等元素
2. 識別知名的梗圖、表情包或模因
3. 如果沒有檢測到任何梗，請返回空數組 []
4. 解釋要詳細且易懂
`;
  }

  /**
   * 構建視頻分析的提示詞
   */
  private buildVideoAnalysisPrompt(videoUrl: string): string {
    return `
請分析以下視頻鏈接可能包含的網路梗、流行用語或模因內容，並以JSON格式返回結果。
基於視頻鏈接的標題、描述或已知內容進行分析。

視頻鏈接：
${videoUrl}

請以以下JSON格式返回：
[
  {
    "term": "梗的名稱",
    "explanation": "詳細的解釋，包括起源、含義和使用場景",
    "referenceUrl": "相關的參考鏈接（可選）"
  }
]

注意：
1. 如果是YouTube鏈接，可以分析URL中的信息
2. 如果沒有檢測到任何梗，請返回空數組 []
3. 解釋要詳細且易懂
4. 可以基於常見的視頻平台內容進行推測
`;
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
          return parsed.filter(
            (item: any): item is MemeDetectionResult =>
              item.term &&
              item.explanation &&
              typeof item.term === 'string' &&
              typeof item.explanation === 'string',
          );
        }
      }

      // 如果無法解析JSON，嘗試簡單的文本解析
      return this.parseSimpleTextResponse(responseText);
    } catch (error) {
      this.logger.error('Error parsing AI response:', error);
      return this.getMockMemes();
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

    return results.length > 0 ? results : this.getMockMemes();
  }

  /**
   * 獲取模擬數據（備用）
   */
  private getMockMemes(): MemeDetectionResult[] {
    return [
      {
        term: '梗一大哥',
        explanation:
          '"梗一大哥"是指在互聯網平台（如哔哩哔哩、快手、抖音）打開全屏模式的用戶，即打開視頻的第一個人。這個梗來源於網友對於搶先看視頻的調侃，表示這個人是第一個發現或分享這個梗的人。',
        referenceUrl: 'https://www.bilibili.com',
      },
      {
        term: 'look at my eyes',
        explanation:
          '一個英文短語，意為"看著我的眼睛"，在網路上常用於強調重要話題或表達嚴肅情感時使用。這個梗經常出現在各種視頻和圖片中，用來吸引注意力或表達真誠。',
        referenceUrl: 'https://knowyourmeme.com',
      },
      {
        term: '完了',
        explanation:
          '表示事情已經結束或無法挽回的狀態，常用於表達無奈或絕望的情緒。在網路語境中，"完了"經常被用作一種誇張的表達方式，表示遇到了麻煩或不好的情況。',
        referenceUrl: '',
      },
    ];
  }
}
