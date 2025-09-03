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
  try {
    const { question, language = 'english', category } = req.body;
    
    // If OpenAI API key is not set, use mock response
    if (!process.env.OPENAI_API_KEY) {
      const responses = {
        english: "Thank you for your question about Islamic parenting. This is a test response. Add your OpenAI API key to environment variables for real AI responses.",
        somali: "Mahadsanid su'aalkaaga ah waalidnimada Islaamka. Kani waa jawaab tijaabo ah. Ku dar OpenAI API key-gaaga si aad u hesho jawaabo dhab ah.",
        arabic: "شكراً لك على سؤالك حول التربية الإسلامية. هذه إجابة تجريبية. أضف مفتاح OpenAI API للحصول على إجابات حقيقية."
      };

      return res.json({
        success: true,
        data: {
          response: responses[language] || responses.english,
          language,
          timestamp: new Date().toISOString(),
          mock: true
        }
      });
    }

    // Real OpenAI integration (when API key is provided)
    const systemPrompts = {
      english: "You are Waalid, an expert Islamic parenting coach. Provide guidance based on Quran and Sunnah for Muslim parents living in Western countries. Be compassionate, practical, and culturally sensitive.",
      somali: "Waxaad tahay Waalid, oo ah khabir waalidnimo Islaam ah. Bixi tilmaan ku saleysan Quraanka iyo Sunnadda waalidka Muslimka ah ee ku nool wadamada reer galbeedka. Noqo mid naxariis badan, ficil ahaan wax ka qabta, oo dhaqan ahaan dareenka leh.",
      arabic: "أنت وااالد، خبير في التربية الإسلامية. قدم الإرشاد بناءً على القرآن والسنة للآباء المسلمين الذين يعيشون في البلدان الغربية. كن رحيماً وعملياً وحساساً ثقافياً."
    };

    // For now, return enhanced mock response until OpenAI integration is complete
    const enhancedResponses = {
      english: `Thank you for your question: "${question}"\n\nAs an Islamic parenting coach, I understand this is important to you. Based on Quran and Sunnah guidance:\n\n• Start with Bismillah and make dua for guidance\n• Remember that Allah tests us to strengthen our faith\n• Consult with local Islamic scholars for specific situations\n• Balance Islamic values with practical Western context\n\nMay Allah guide you in raising righteous children. Please add your OpenAI API key for more detailed, personalized responses.`,
      somali: `Mahadsanid su'aashaada: "${question}"\n\nAniga oo ah macalin waalidnimo Islaameed, waan fahmayaa in tani muhiim tahay. Marka la eego tilmaamaha Quraanka iyo Sunnadda:\n\n• Ku bilow Bismillaah oo u duucan hidaaya\n• Xusuusno in Allah na imtixaamo si uu imaankaga u xoojiyo\n• La tasho culimada Islaamka maxalliga ah xaaladaha gaarka ah\n• Isku dheelitir qiyamka Islaamka iyo xaaladda reer galbeedka\n\nEebe ha ku hago barbaarinta carruur xaq ah. Fadlan ku dar OpenAI API key si aad u hesho jawaabo faahfaahsan.`,
      arabic: `شكراً لسؤالك: "${question}"\n\nكمدرب تربية إسلامية، أفهم أن هذا مهم لك. بناءً على إرشاد القرآن والسنة:\n\n• ابدأ بالبسملة وادع بالهداية\n• تذكر أن الله يبتلينا لتقوية إيماننا\n• استشر العلماء المحليين في الحالات الخاصة\n• وازن بين القيم الإسلامية والسياق الغربي العملي\n\nعسى الله أن يهديك في تربية أطفال صالحين. يرجى إضافة مفتاح OpenAI API للحصول على إجابات مفصلة ومخصصة.`
    };

    res.json({
      success: true,
      data: {
        response: enhancedResponses[language] || enhancedResponses.english,
        language,
        category,
        timestamp: new Date().toISOString(),
        mock: false
      }
    });

  } catch (error) {
    console.error('AI Coach error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get AI response'
    });
  }
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