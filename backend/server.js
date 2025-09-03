require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Waalid Legacy Backend is running!' });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Waalid Legacy API is working!',
    timestamp: new Date().toISOString()
  });
});

// AI Coach routes
app.post('/api/ai-coach/ask', async (req, res) => {
  const { question, language = 'english' } = req.body;
  
  // Mock response for now
  const responses = {
    english: "Thank you for your question about Islamic parenting. This is a test response. In production, this would be powered by OpenAI with Islamic guidance.",
    somali: "Mahadsanid su'aalkaaga ah waalidnimada Islaamka. Kani waa jawaab tijaabo ah. Shidaalka gudbinta, kani waxa uu noqon lahaa mid OpenAI ku socda oo leh tilmaan Islaameed.",
    arabic: "شكراً لك على سؤالك حول التربية الإسلامية. هذه إجابة تجريبية. في الإنتاج، سيتم تشغيل هذا بواسطة OpenAI مع إرشاد إسلامي."
  };

  res.json({
    success: true,
    data: {
      response: responses[language] || responses.english,
      language,
      timestamp: new Date().toISOString()
    }
  });
});

// AI Coach history route
app.get('/api/ai-coach/history', async (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        question: "How do I teach my child about prayer?",
        response: "Start with short, simple explanations about talking to Allah...",
        language: "english",
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        question: "Sidee ugu baraa ilmaha tukashada?",
        response: "Ka bilaaw sharaxaad kooban oo fudud oo ku saabsan la hadlida Allah...",
        language: "somali", 
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ]
  });
});

// Community routes (mock)
app.get('/api/community/posts', (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

// Daily tips route (mock)
app.get('/api/feed/daily-tip', (req, res) => {
  res.json({
    success: true,
    data: {
      title: "Start your day with gratitude",
      content: "Teach children to say Alhamdulillah when they wake up.",
      verse: "وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
      reference: "Quran 14:7"
    }
  });
});

// Workshops route (mock)
app.get('/api/workshops', (req, res) => {
  res.json({
    success: true,
    data: []
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Waalid Legacy Backend running on port ${PORT}`);
  console.log(`📡 API available at http://0.0.0.0:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});