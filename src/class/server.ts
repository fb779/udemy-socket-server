import express, { Router } from 'express';
import { SERVER_PORT } from '../global/environmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

// const bodyParser = require('body-parser');
// const cors = require('cors');

export default class Server {
  public app: express.Application;
  public port: Number;

  constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.addPlugins();
  }

  start(callback: any) {
    this.app.listen(this.port, callback);
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
}
