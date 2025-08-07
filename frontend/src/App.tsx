import { useState } from 'react'
import './App.css'
import { InputField } from './components/InputField'
import { ResultsContainer } from './components/MemeTerms'
import type { MemeTerm } from './components/MemeTerms'
import { ApiService } from './services/api'
import axios from 'axios'

function App() {
  const [showResults, setShowResults] = useState(false);
  const [memeTerms, setMemeTerms] = useState<MemeTerm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (text: string, file?: File | null) => {
    if (!text.trim() && !file) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      let memes: MemeTerm[] = [];
      
      // 如果有文件，优先处理图片上传
      if (file) {
        // 创建FormData对象
        const formData = new FormData();
        formData.append('file', file);
        
        try {
          // 使用axios进行文件上传
          const uploadResponse = await axios.post('http://localhost:3000/uploads', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          if (uploadResponse.status !== 201 && uploadResponse.status !== 200) {
            throw new Error('图片上传失败');
          }
          
          // 创建带图片URL的提交
          memes = await ApiService.createSubmission({ imageUrl: uploadResponse.data.imageUrl });
        } catch (uploadError) {
          console.error('图片上传错误:', uploadError);
          throw new Error('图片上传失败');
        }
      } else if (text.trim()) {
        // 如果是YouTube链接，提取为videoUrl，否则作为textContent
        const isYoutubeUrl = (url: string) => {
          return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.*$/.test(url);
        };
        
        const submissionData = isYoutubeUrl(text.trim()) 
          ? { videoUrl: text.trim() } 
          : { textContent: text.trim() };
        
        // 发送到API
        memes = await ApiService.createSubmission(submissionData);
      }
      setMemeTerms(memes);
      setShowResults(true);
    } catch (err) {
      console.error('提交失败:', err);
      setError('提交失败，请稍后再试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>WUTMEME</h1>
      </header>

      <main className="app-main">
        <div className="input-section">
          <InputField onSubmit={handleSubmit} disabled={isLoading} />
          {isLoading && <div className="loading-indicator">处理中...</div>}
          {error && <div className="error-message">{error}</div>}
        </div>

        {showResults && <ResultsContainer memeTerms={memeTerms} />}
      </main>
    </div>
  )
}

export default App
