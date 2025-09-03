import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../server';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', async (req: any, res: any) => {
  try {
    const workshops = await prisma.workshop.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { enrollments: true }
        }
      }
    });

    res.json(workshops);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workshops' });
  }
});

router.get('/:id', async (req: any, res: any) => {
  try {
    const { id } = req.params;
    
    const workshop = await prisma.workshop.findUnique({
      where: { id },
      include: {
        _count: {
          select: { enrollments: true }
        }
      }
    });

    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }

    res.json(workshop);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workshop' });
  }
});

router.post('/:id/enroll', authenticateToken, async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const workshop = await prisma.workshop.findUnique({
      where: { id, isActive: true }
    });

    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }

    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_workshopId: { userId, workshopId: id }
      }
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        workshopId: id
      },
      include: {
        workshop: true
      }
    });

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to enroll in workshop' });
  }
});

router.get('/my/enrollments', authenticateToken, async (req: any, res: any) => {
  try {
    const userId = req.user.userId;

    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: {
        workshop: true
      },
      orderBy: { enrolledAt: 'desc' }
    });

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch enrollments' });
  }
});

export default router;