import http from 'http';
import express, { Router } from 'express';
import { SERVER_PORT } from '../global/environmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import socketIO from 'socket.io';
import _sk from '../sockets/socket';

export default class Server {
  private static _instance: Server;
  private httpServer: http.Server;
  public app: express.Application;
  public port: Number;
  public io: socketIO.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.addPlugins();

    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);
    this.listenSocket();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public static get instanceSocket() {
    return this.instance.io;
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
    this.io.on('connection', (client) => {
      _sk.userConnect(client);

      _sk.getChatMessage(client, this.io);

      _sk.desconectado(client);

      // _sk.setUpUser(client, this.io);
      _sk.setUpUser(client);
    });
  }
}
