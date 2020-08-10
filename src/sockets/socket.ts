import socketIO, { Socket } from 'socket.io';
import { AdminUsers } from '../class/admin-users';
import { User } from '../class/user';

const listUsers = new AdminUsers();

const userConnect = (_client: Socket) => {
  const user = new User(_client.id);
  listUsers.addUser(user);
  // console.log(listUsers.getList());
};

const desconectado = (_client: Socket) => {
  _client.on('disconnect', () => {
    listUsers.deleteUser(_client.id);
    // console.log(listUsers.getList());
  });
};

const setUpUser = (_client: Socket, _io?: SocketIO.Server) => {
  _client.on('setup-user', (data: any, callback: Function) => {
    listUsers.updateName(_client.id, data.name);
    const us = listUsers.getUser(_client.id);
    callback(us);
  });
};

const getChatMessage = (_client: Socket, _io: SocketIO.Server) => {
  _client.on('chat-message', (data: message) => {
    // _client.broadcast.emit('new-message', data);
    _io.emit('new-message', data);
  });
};

const getChatPrivateMessage = (_client: Socket, _io?: SocketIO.Server) => {
  _client.on('private-message', (data: message) => {
    console.log('Recepcion de mensajes privados', data);
    // _client.to().emit('new-message', data);
    // _io.emit('new-message', data);
  });
};

export = {
  userConnect,
  desconectado,
  setUpUser,
  getChatMessage,
};

interface message {
  to: string;
  message: string;
}
