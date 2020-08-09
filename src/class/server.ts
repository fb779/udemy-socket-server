import http from 'http';
import express, { Router } from 'express';
import { SERVER_PORT } from '../global/environmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import socketIO from 'socket.io';

export default class Server {
  private httpServer: http.Server;
  public app: express.Application;
  public port: Number;
  public io: socketIO.Server;

  constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.addPlugins();

    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);
  }

  start(callback: any) {
    // this.app.listen(this.port, callback);
    this.httpServer.listen(this.port, callback);
  }

  addPlugins() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(helmet());
  }

  addRouter(router: Router) {
    this.app.use(router);
  }

  private listenSocket() {
    console.log('escuchando conecciones - socket');

    this.io.on('connection', (client) => {
      console.log('nueva coneccion al socket');
    });
  }
}
