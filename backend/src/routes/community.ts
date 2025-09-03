import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../server';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/posts', async (req: any, res: any) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { id: true, name: true, avatar: true }
        },
        comments: {
          include: {
            author: {
              select: { id: true, name: true, avatar: true }
            }
          },
          take: 3,
          orderBy: { createdAt: 'desc' }
        },
        likes: true,
        _count: {
          select: { comments: true, likes: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

router.post('/posts', authenticateToken, [
  body('title').trim().isLength({ min: 5, max: 100 }),
  body('content').trim().isLength({ min: 10, max: 2000 })
], async (req: any, res: any) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;
    const userId = req.user.userId;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId
      },
      include: {
        author: {
          select: { id: true, name: true, avatar: true }
        }
      }
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post' });
  }
});

router.post('/posts/:postId/comments', authenticateToken, [
  body('content').trim().isLength({ min: 1, max: 500 })
], async (req: any, res: any) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: userId
      },
      include: {
        author: {
          select: { id: true, name: true, avatar: true }
        }
      }
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create comment' });
  }
});

router.post('/posts/:postId/like', authenticateToken, async (req: any, res: any) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: { postId, userId }
      }
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id }
      });
      res.json({ liked: false });
    } else {
      await prisma.like.create({
        data: { postId, userId }
      });
      res.json({ liked: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle like' });
  }
});

export default router;