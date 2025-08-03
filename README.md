# 🧠 Wutmeme

> A lightweight web platform for detecting and explaining memes in text and images.  
> Upload text or images and get instant meme explanations, powered by AI.

---

## 📌 Project Goal

**Wutmeme** is a web application that allows users to:
- Upload **text** or **images**
- Automatically detect **meme content**
- Return **explanations**, references, and examples (e.g., YouTube links)
- Provide a **backend admin dashboard** for curating and managing meme data

The goal is to build a fully functional prototype within one month.

---

## 🧱 Tech Stack

### 🎨 Frontend
| Tech | Role |
|------|------|
| **React** | Component-based UI |
| **TypeScript** | Type-safe development |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **Zustand** (optional) | Lightweight state management |
| **Axios** | API client for HTTP requests |

### 🧰 Backend
| Tech | Role |
|------|------|
| **NestJS** | Scalable server-side framework |
| **TypeORM** | ORM for DB access |
| **PostgreSQL** | Primary database |
| **AdminJS** | Lightweight admin dashboard |
| **Multer / Formidable** | File uploads (image support) |
| **OpenAI API** | Meme detection via LLMs |
| **Redis / Caching** (optional) | Avoid redundant LLM calls |

### 🧪 Dev Tools
- **WSL2 + Ubuntu** for Linux dev environment
- **VSCode** as primary editor
- **Docker** for future deployment
- **GitHub** for version control
- **Postman** for testing backend APIs
---

## 📁 Project Structure

```
wutmeme/
├── .git/                # Git 
├── .gitignore
├── LICENSE
├── README.md
├── backend/             # NestJS + AdminJS backend
├── docker/              # Docker / Nginx 
├── docs/                # docs
└── frontend/            # React + TypeScript + Vite 
```

## 🚧 Development Milestones

### Week 1
 - Setup GitHub repo and WSL environment

 - Initialize frontend (React + Vite + TypeScript)

 - Initialize backend (NestJS + AdminJS)

 - Define DB models: Meme, Submission, User (optional)

## Week 2
- Implement text meme recognition flow (with OpenAI)

- Build frontend interface for text input and result display

- Setup AdminJS dashboard

### Week 3
- Implement image upload + meme extraction

- Add submission history and simple user tracking

- Frontend preview & refactor

### Week 4
- Polish UI/UX

- Optional caching and performance tuning

- Prepare for deployment (Docker / Nginx / Hosting)


## 🙋 Author
- Wutmeme is created by [JadenHuang-dev] as a solo project to explore AI-based meme analysis and full-stack web development using modern tools.

```
dev up

cd wutmeme/frontend
npm run dev


```