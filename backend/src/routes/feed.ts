import { Router } from 'express';
import { prisma } from '../server';

const router = Router();

router.get('/daily-tips', async (req, res) => {
  try {
    const tips = await prisma.dailyTip.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    res.json(tips);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch daily tips' });
  }
});

router.get('/daily-tip', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let todaysTip = await prisma.dailyTip.findFirst({
      where: {
        isActive: true,
        createdAt: {
          gte: today,
          lt: tomorrow
        }
      }
    });

    if (!todaysTip) {
      todaysTip = await prisma.dailyTip.findFirst({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      });
    }

    if (!todaysTip) {
      return res.status(404).json({ message: 'No tips available' });
    }

    res.json(todaysTip);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch today\'s tip' });
  }
});

export default router;