# 🕌 Waalid Legacy - AI-Powered Islamic Parenting Platform

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

> Empowering Muslim parents worldwide with AI-driven Islamic parenting guidance in English, Somali, and Arabic

A comprehensive, enterprise-grade parenting support platform combining Islamic wisdom from Quran & Sunnah with modern AI technology to help parents raise confident, faith-centered children in the West.

## 🚀 Features

### Core Features
- **AI Parenting Coach**: GPT-4 powered personalized parenting advice
- **Community Hub**: Real-time parent-to-parent support network
- **Daily Parenting Feed**: Curated tips and Islamic wisdom
- **Workshops & Resources**: Premium ebooks, videos, and courses

### Enterprise Features
- **High Availability**: Kubernetes orchestration with auto-scaling
- **Real-time Communication**: WebSocket support for live interactions
- **Caching Layer**: Redis for optimal performance
- **Monitoring**: Sentry error tracking and Winston logging
- **Security**: JWT authentication, rate limiting, helmet.js protection
- **CI/CD Pipeline**: Automated testing and deployment

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Next.js 15    │────▶│   Express.js    │────▶│   PostgreSQL    │
│   Frontend      │     │   Backend       │     │   Database      │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                        │                        │
        │                        │                        │
        ▼                        ▼                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Tailwind CSS  │     │   Socket.io     │     │     Redis       │
│   Framer Motion │     │   Real-time     │     │     Cache       │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **State Management**: Zustand
- **API Client**: Axios with React Query

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis
- **Real-time**: Socket.io
- **AI**: OpenAI GPT-4
- **Authentication**: JWT
- **Security**: Helmet, CORS, Rate Limiting

### DevOps
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry, Winston
- **Testing**: Jest, Supertest

## 📦 Installation

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/walaaid-legacy-parenting.git
cd walaaid-legacy-parenting
```

2. **Backend Setup**
```bash
cd backend
cp .env.example .env
# Edit .env with your credentials
npm install
npx prisma generate
npx prisma db push
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

### Docker Deployment

```bash
docker-compose up -d
```

### Kubernetes Deployment

```bash
kubectl apply -f k8s/
```

## 🔐 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/walaaid_parenting"
JWT_SECRET="your-super-secret-jwt-key"
OPENAI_API_KEY="your-openai-api-key"
REDIS_HOST="localhost"
REDIS_PORT="6379"
REDIS_PASSWORD="your-redis-password"
SENTRY_DSN="your-sentry-dsn"
NODE_ENV="development"
PORT=5000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

## 📊 Database Schema

The platform uses a comprehensive PostgreSQL schema with the following main entities:
- Users (authentication and profiles)
- Posts & Comments (community features)
- AI Coach Sessions (conversation history)
- Daily Tips (parenting wisdom)
- Workshops & Enrollments (educational content)

## 🚀 Performance Optimizations

- **Redis Caching**: Frequently accessed data cached with TTL
- **Database Indexing**: Optimized queries with proper indexes
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Dynamic imports for optimal bundle size
- **CDN Integration**: Static assets served via CDN
- **Connection Pooling**: Efficient database connections

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: DDoS protection
- **Input Validation**: Express-validator for all inputs
- **SQL Injection Prevention**: Prisma ORM parameterized queries
- **XSS Protection**: Helmet.js security headers
- **CORS Configuration**: Strict origin policies
- **Environment Variables**: Sensitive data protection

## 📈 Monitoring & Logging

- **Error Tracking**: Sentry integration
- **Application Logs**: Winston with multiple transports
- **Health Checks**: Kubernetes probes
- **Performance Metrics**: Custom metrics collection
- **Audit Logs**: User activity tracking

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

## 📝 API Documentation

API documentation available at: http://localhost:5000/api-docs (when running locally)

### Key Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/ai-coach/ask` - AI parenting advice
- `GET /api/community/posts` - Community posts
- `GET /api/workshops` - Available workshops
- `GET /api/feed/daily-tip` - Today's parenting tip

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Product Owner**: Yussuf Abdi
- **Tech Lead**: Development Team
- **UI/UX**: Design Team
- **DevOps**: Infrastructure Team

## 📞 Support

For support, email support@walaaid.com or join our Slack channel.

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Video consultations
- [ ] AI-powered content recommendations
- [ ] Advanced analytics dashboard
- [ ] Payment integration for premium features

---

Built with ❤️ for parents worldwide