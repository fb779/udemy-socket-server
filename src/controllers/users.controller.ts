import { Request, Response, NextFunction } from 'express';
import Server from '../class/server';
import { listUsers } from '../sockets/socket';

const io = Server.instanceSocket;

export const getUsersOnline = (req: Request, res: Response, next: NextFunction) => {
  io.clients((err: any, clients: string[]) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error',
        err,
      });
    }

    res.json({
      ok: true,
      message: 'usuarios conectados',
      clients: listUsers.getAllUsers(),
    });
  });
};
