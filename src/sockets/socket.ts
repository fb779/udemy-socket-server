import socketIO, { Socket } from 'socket.io';

const desconectado = (_client: Socket) => {
  _client.on('disconnect', () => {
    console.log('Cliente desconectado', _client.id);
  });
};

const getChatMessage = (_client: Socket, _io: SocketIO.Server) => {
  _client.on('chat-message', (data: message) => {
    // _client.broadcast.emit('new-message', data);
    _io.emit('new-message', data);
  });
};
export = {
  desconectado,
  getChatMessage,
};

interface message {
  to: string;
  message: string;
}
