import { Router, Request, Response } from 'express';
import * as msgCtrl from '../controllers/mesasge.controller';
import * as userCtrl from '../controllers/users.controller';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: 'holaaaa',
  });
});

router.post('/mensajes', msgCtrl.publicMessage);

router.post('/mensajes/:id', msgCtrl.privateMessage);

router.get('/users', userCtrl.getUsersOnline);

export default router;
