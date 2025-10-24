/**
 * AI 梗分析相关的提示词模板
 */

export class MemeAnalysisPrompts {
  /**
   * 文本分析提示词模板
   */
  static readonly TEXT_ANALYSIS = `
請分析以下文本中包含的網路梗、流行用語或模因內容，並以JSON格式返回結果。
每個檢測到的梗都應該包含：term（梗的名稱）、explanation（詳細解釋）、referenceUrl（參考鏈接，可選）。

文本內容：
{text}

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

  /**
   * 圖片分析提示词模板
   */
  static readonly IMAGE_ANALYSIS = `
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

  /**
   * 視頻分析提示词模板
   */
  static readonly VIDEO_ANALYSIS = `
請分析以下視頻鏈接可能包含的網路梗、流行用語或模因內容，並以JSON格式返回結果。
基於視頻鏈接的標題、描述或已知內容進行分析。

視頻鏈接：
{videoUrl}

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

  /**
   * 填充文本分析提示词模板
   */
  static buildTextAnalysisPrompt(text: string): string {
    return this.TEXT_ANALYSIS.replace('{text}', text);
  }

  /**
   * 獲取圖片分析提示词
   */
  static buildImageAnalysisPrompt(): string {
    return this.IMAGE_ANALYSIS;
  }

  /**
   * 填充視頻分析提示词模板
   */
  static buildVideoAnalysisPrompt(videoUrl: string): string {
    return this.VIDEO_ANALYSIS.replace('{videoUrl}', videoUrl);
  }
}
