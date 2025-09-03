import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import OpenAI from 'openai';
import { prisma } from '../server';
import { authenticateToken } from '../middleware/auth';
import { MUSLIM_PARENTING_SYSTEM_PROMPTS, PARENTING_CATEGORIES } from '../config/ai-prompts';

const router = Router();
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

router.post('/ask', authenticateToken, [
  body('question').trim().isLength({ min: 10, max: 500 }),
  body('language').optional().isIn(['english', 'somali', 'arabic']),
  body('category').optional().isString()
], async (req: any, res: any) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { question, language = 'english', category } = req.body;
    const userId = req.user.userId;

    if (!openai) {
      return res.status(503).json({ 
        message: 'AI service is not configured. Please add OPENAI_API_KEY to environment variables.' 
      });
    }

    const systemPrompt = MUSLIM_PARENTING_SYSTEM_PROMPTS[language as keyof typeof MUSLIM_PARENTING_SYSTEM_PROMPTS] || MUSLIM_PARENTING_SYSTEM_PROMPTS.english;
    
    const contextualPrompt = category 
      ? `${systemPrompt}\n\nThis question is related to: ${category}. Please provide specialized guidance for this area.`
      : systemPrompt;

    const languageInstruction = language !== 'english' 
      ? `\n\nIMPORTANT: Respond primarily in ${language === 'somali' ? 'Somali' : 'Arabic'} language, but include English translations for Islamic terms when helpful.`
      : '';

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: contextualPrompt + languageInstruction
        },
        {
          role: "user",
          content: question
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;

    const session = await prisma.aiCoachSession.create({
      data: {
        userId,
        question,
        response: response || 'No response generated',
        language: language.toUpperCase() as any,
        category
      }
    });

    res.json({
      id: session.id,
      response,
      createdAt: session.createdAt
    });

  } catch (error) {
    console.error('AI Coach error:', error);
    res.status(500).json({ message: 'Failed to get coaching advice' });
  }
});

router.get('/history', authenticateToken, async (req: any, res: any) => {
  try {
    const userId = req.user.userId;
    const sessions = await prisma.aiCoachSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});

export default router;