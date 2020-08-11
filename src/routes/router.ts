import { Router, Request, Response } from 'express';
import * as msgCtrl from '../controllers/mesasge.controller';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: 'holaaaa',
  });
});

router.post('/mensajes', msgCtrl.publicMessage);

router.post('/mensajes/:id', msgCtrl.privateMessage);

export default router;
