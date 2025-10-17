const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

async function testGoogleAI() {
  console.log('🧠 測試 Google AI Studio API...');
  
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  
  if (!apiKey || apiKey === 'your_google_ai_studio_api_key_here') {
    console.log('❌ Google AI API key 未配置');
    console.log('請在 .env 文件中設置 GOOGLE_AI_API_KEY');
    return;
  }

  // 設置環境變數供 GoogleGenAI 使用
  process.env.GEMINI_API_KEY = apiKey;

  try {
    // 根據官方例子，GoogleGenAI 會自動從環境變數讀取 API key
    const ai = new GoogleGenAI({});

    const testText = '你好，這是一個測試。看著我的眼睛，完了！';
    
    const prompt = `
請分析以下文本中包含的網路梗、流行用語或模因內容，並以JSON格式返回結果。

文本內容：
${testText}

請以以下JSON格式返回：
[
  {
    "term": "梗的名稱",
    "explanation": "詳細的解釋",
    "referenceUrl": "參考鏈接（可選）"
  }
]
`;

    console.log('🚀 發送請求到 Google AI...');
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    console.log('✅ API 響應成功！');
    console.log('📝 響應內容：');
    console.log(response.text);
    
    // 嘗試解析JSON
    try {
      const jsonMatch = response.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log('🎯 解析的梗數據：');
        console.log(JSON.stringify(parsed, null, 2));
      }
    } catch (parseError) {
      console.log('⚠️ JSON 解析失敗，但API調用成功');
    }
    
  } catch (error) {
    console.log('❌ API 調用失敗：');
    console.error(error);
  }
}

// 執行測試
testGoogleAI().then(() => {
  console.log('✨ 測試完成');
}).catch(error => {
  console.error('💥 測試過程中發生錯誤：', error);
});