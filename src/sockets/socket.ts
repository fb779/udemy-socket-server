import { Socket } from 'socket.io';
import { AdminUsers } from '../class/admin-users';
import { User } from '../class/user';

export const listUsers = new AdminUsers();

export const userConnect = (_client: Socket, _io: SocketIO.Server) => {
  const user = new User(_client.id);
  listUsers.addUser(user);
  // _io.emit('online-users', listUsers.getList());
};

export const userDisconnect = (_client: Socket, _io: SocketIO.Server) => {
  _client.on('user-disconnect', (data, callback) => {
    listUsers.updateName(_client.id, 'No-Name');

    _io.emit('online-users', listUsers.getList());

    callback({ ok: true, message: 'Out chat' });
  });
};

export const setUpUser = (_client: Socket, _io: SocketIO.Server) => {
  _client.on('setup-user', (data: any, callback: Function) => {
    listUsers.updateName(_client.id, data.name);
    const us = listUsers.getUser(_client.id);
    _io.emit('online-users', listUsers.getList());
    callback(us);
  });
};

export const getListUsers = (_client: Socket, _io: SocketIO.Server) => {
  _client.on('list-users', (data: any, callback: Function) => {
    _io.to(_client.id).emit('online-users', listUsers.getList());
    // _io.emit('online-users', listUsers.getList());
  });
};

export const getChatMessage = (_client: Socket, _io: SocketIO.Server) => {
  _client.on('chat-message', (data: message) => {
    // _client.broadcast.emit('new-message', data);
    _io.emit('new-message', data);
  });
};

export const getChatPrivateMessage = (_client: Socket, _io?: SocketIO.Server) => {
  _client.on('private-message', (data: message) => {
    console.log('Recepcion de mensajes privados', data);
    // _client.to().emit('new-message', data);
    // _io.emit('new-message', data);
  });
};

export const desconectado = (_client: Socket, _io: SocketIO.Server) => {
  _client.on('disconnect', () => {
    listUsers.deleteUser(_client.id);
    // _io.emit('online-users', listUsers.getList());
  });
};

// export = {
//   listUsers,
//   getListUsers,
//   userConnect,
//   desconectado,
//   setUpUser,
//   getChatMessage,
// };

interface message {
  to: string;
  message: string;
}
