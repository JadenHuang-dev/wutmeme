import axios from 'axios';
import type { MemeTerm } from '../components/MemeTerms';

// API基础URL配置
const API_BASE_URL = 'http://localhost:3000'; // 后端服务地址

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 提交接口
export interface SubmissionRequest {
  textContent?: string;
  imageUrl?: string;
  videoUrl?: string;
}

// 提交响应接口
export interface SubmissionResponse {
  id: number;
  textContent?: string;
  imageUrl?: string;
  videoUrl?: string;
  detectedMemes: Array<{
    id: number;
    term: string;
    explanation: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

// API服务
export const ApiService = {
  // 提交文本、图片或视频链接
  async createSubmission(data: SubmissionRequest): Promise<MemeTerm[]> {
    try {
      const response = await apiClient.post<SubmissionResponse>('/submissions', data);
      
      // 将后端响应数据转换为前端所需的MemeTerm格式
      return response.data.detectedMemes.map(meme => ({
        term: meme.term,
        explanation: meme.explanation,
      }));
    } catch (error) {
      console.error('Error creating submission:', error);
      throw error;
    }
  },

  // 获取所有提交
  async getAllSubmissions(): Promise<SubmissionResponse[]> {
    try {
      const response = await apiClient.get<SubmissionResponse[]>('/submissions');
      return response.data;
    } catch (error) {
      console.error('Error fetching submissions:', error);
      throw error;
    }
  }
};
