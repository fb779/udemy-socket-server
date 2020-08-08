import { Router, Request, Response } from 'express';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: 'holaaaa',
  });
});

router.post('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: 'holaaaa',
    data: req.body,
  });
});

export default router;
