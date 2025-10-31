# 🧠 Wutmeme

[English](#english) | [中文](#中文)

---

## English

> A lightweight web platform for detecting and explaining memes in text and images.  
> Upload text or images and get instant meme explanations, powered by AI.

### 📌 Project Overview

**Wutmeme** is a full-stack web application that allows users to:
- 📝 Submit **text content** for meme detection
- 📷 Upload **images** for meme analysis  
- 🎬 Paste **video links** (YouTube) for meme identification
- 🤖 Get **AI-powered explanations** of detected memes
- 📊 Browse submission history via **Swagger API dashboard**

### 🚀 Live Demo

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3000](http://localhost:3000)
- **API Documentation**: [http://localhost:3000/admin](http://localhost:3000/admin)

### 🛠️ Tech Stack

#### Frontend
- **React 19** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Axios** - HTTP client for API communication

#### Backend
- **NestJS** - Scalable Node.js framework
- **TypeORM** - Database ORM
- **PostgreSQL** - Primary database
- **Swagger** - API documentation
- **Multer** - File upload handling
- **Google Gemini AI** - Meme detection and analysis

#### DevOps
- **Docker & Docker Compose** - Containerization
- **GitHub** - Version control

### 📁 Project Structure

```
wutmeme/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── controller/      # API Controllers
│   │   ├── service/         # Business Logic
│   │   ├── entities/        # Database Models
│   │   ├── dto/            # Data Transfer Objects
│   │   └── prompts/        # AI Prompt Templates
│   ├── uploads/            # Uploaded files
│   └── package.json
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # React Components
│   │   ├── services/       # API Services
│   │   └── assets/         # Static Assets
│   └── package.json
├── docker/                 # Docker Configuration
├── docker-compose.yml      # Service Orchestration
└── setup.sh               # Automated Setup Script
```

### 🎯 Key Features

- **Multi-format Support**: Text, images, and video links
- **AI-Powered Analysis**: Google Gemini integration for meme detection
- **Real-time Processing**: Instant meme explanations
- **File Upload**: Secure image upload with validation
- **RESTful API**: Well-documented Swagger endpoints
- **Responsive UI**: Mobile-friendly interface

### ⚡ Quick Start

#### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Git

#### One-Click Setup
```bash
# Clone the repository
git clone https://github.com/JadenHuang-dev/wutmeme.git
cd wutmeme

# Run automated setup script
chmod +x setup.sh
./setup.sh
```

#### Manual Setup
```bash
# Start all services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

#### Individual Services
```bash
# Backend only
docker-compose up backend

# Frontend only  
docker-compose up frontend

# Database only
docker-compose up postgres
```

### 🔧 Configuration

Create `backend/.env` file:
```env
# Database Configuration
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=wutmeme_user
DB_PASSWORD=wutmeme_pass
DB_DATABASE=wutmeme

# Google AI Configuration
GOOGLE_AI_API_KEY=your_google_ai_studio_api_key_here

# API Configuration
API_BASE_URL=http://localhost:3000
PORT=3000
```

### 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/submissions` | Create new submission |
| `GET` | `/submissions` | Get all submissions |
| `GET` | `/memes` | Get all detected memes |
| `POST` | `/uploads` | Upload image file |

### 🐛 Troubleshooting

**Slow npm installs?**
```bash
# Use Chinese mirror
npm config set registry https://registry.npmmirror.com

# Restore to official
npm config set registry https://registry.npmjs.org
```

**Port conflicts?**
```bash
# Check port usage
sudo lsof -i :3000
sudo lsof -i :5173

# Stop conflicting services
docker-compose down
```

### 📄 License

Licensed under the [Apache License 2.0](LICENSE)

### 👨‍💻 Author

Created by [JadenHuang-dev](https://github.com/JadenHuang-dev) as a full-stack exploration of AI-powered meme analysis.

---

## 中文

> 轻量级网络梗检测和解释平台  
> 上传文本或图片，获得AI驱动的即时梗解释

### 📌 项目概述

**Wutmeme** 是一个全栈网络应用程序，允许用户：
- 📝 提交**文本内容**进行梗检测
- 📷 上传**图片**进行梗分析
- 🎬 粘贴**视频链接**（YouTube）进行梗识别
- 🤖 获得**AI驱动的解释**检测到的梗
- 📊 通过**Swagger API仪表板**浏览提交历史

### 🚀 在线演示

- **前端界面**: [http://localhost:5173](http://localhost:5173)
- **后端API**: [http://localhost:3000](http://localhost:3000)
- **API文档**: [http://localhost:3000/admin](http://localhost:3000/admin)

### 🛠️ 技术栈

#### 前端
- **React 19** - 现代UI框架
- **TypeScript** - 类型安全开发
- **Vite** - 超快构建工具
- **Axios** - API通信HTTP客户端

#### 后端
- **NestJS** - 可扩展的Node.js框架
- **TypeORM** - 数据库ORM
- **PostgreSQL** - 主数据库
- **Swagger** - API文档
- **Multer** - 文件上传处理
- **Google Gemini AI** - 梗检测和分析

#### 开发运维
- **Docker & Docker Compose** - 容器化
- **GitHub** - 版本控制

### � 项目结构

```
wutmeme/
├── backend/                 # NestJS 后端
│   ├── src/
│   │   ├── controller/      # API控制器
│   │   ├── service/         # 业务逻辑
│   │   ├── entities/        # 数据库模型
│   │   ├── dto/            # 数据传输对象
│   │   └── prompts/        # AI提示词模板
│   ├── uploads/            # 上传文件
│   └── package.json
├── frontend/               # React 前端
│   ├── src/
│   │   ├── components/     # React组件
│   │   ├── services/       # API服务
│   │   └── assets/         # 静态资源
│   └── package.json
├── docker/                 # Docker配置
├── docker-compose.yml      # 服务编排
└── setup.sh               # 自动化设置脚本
```

### 🎯 核心功能

- **多格式支持**: 文本、图片和视频链接
- **AI驱动分析**: Google Gemini集成梗检测
- **实时处理**: 即时梗解释
- **文件上传**: 安全的图片上传验证
- **RESTful API**: 完善的Swagger端点文档
- **响应式UI**: 移动端友好界面

### ⚡ 快速开始

#### 环境要求
- Docker & Docker Compose
- Node.js 18+ (本地开发)
- Git

#### 一键安装
```bash
# 克隆仓库
git clone https://github.com/JadenHuang-dev/wutmeme.git
cd wutmeme

# 运行自动化设置脚本
chmod +x setup.sh
./setup.sh
```

#### 手动安装
```bash
# 启动所有服务
docker-compose up --build

# 或后台运行
docker-compose up -d --build
```

#### 单独启动服务
```bash
# 仅后端
docker-compose up backend

# 仅前端
docker-compose up frontend

# 仅数据库
docker-compose up postgres
```

### 🔧 配置

创建 `backend/.env` 文件：
```env
# 数据库配置
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=wutmeme_user
DB_PASSWORD=wutmeme_pass
DB_DATABASE=wutmeme

# Google AI 配置
GOOGLE_AI_API_KEY=your_google_ai_studio_api_key_here

# API 配置
API_BASE_URL=http://localhost:3000
PORT=3000
```

### 📋 API接口

| 方法 | 端点 | 描述 |
|------|------|------|
| `POST` | `/submissions` | 创建新提交 |
| `GET` | `/submissions` | 获取所有提交 |
| `GET` | `/memes` | 获取所有检测到的梗 |
| `POST` | `/uploads` | 上传图片文件 |

### 🐛 故障排除

**npm安装速度慢？**
```bash
# 使用国内镜像
npm config set registry https://registry.npmmirror.com

# 恢复官方镜像
npm config set registry https://registry.npmjs.org
```

**端口冲突？**
```bash
# 检查端口使用情况
sudo lsof -i :3000
sudo lsof -i :5173

# 停止冲突服务
docker-compose down
```

### 📄 许可证

基于 [Apache License 2.0](LICENSE) 许可证

### 👨‍💻 作者

由 [JadenHuang-dev](https://github.com/JadenHuang-dev) 创建，作为AI驱动梗分析的全栈技术探索项目。
