require('dotenv').config();

import Server from './class/server';
import router from './routes/router';

const server = new Server();

server.addRouter(router);

server.start(() => {
  console.log(`Servidor ejecutando en el puerto ${server.port}`);
});
