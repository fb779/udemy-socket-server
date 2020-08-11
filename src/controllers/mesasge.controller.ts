import { Request, Response, NextFunction } from 'express';
import Server from '../class/server';

const io = Server.instanceSocket;

export const publicMessage = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  // const body = req.body;
  const payload = { to: body.to, message: body.message };

  io.emit('new-message', payload);

  res.status(200).json({ ok: true, body, msg: 'Mensaje publico' });
};

export const privateMessage = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const body = req.body;
  // const body = req.body;

  const payload = { to: body.to, message: body.message };

  io.in(id).emit('private-message', payload);

  res.status(200).json({ ok: true, id, body, msg: 'mensaje privado' });
};
