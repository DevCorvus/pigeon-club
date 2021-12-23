import type { Server as WebSocketServer, Socket } from 'socket.io';
import { verifyJwt } from './utils/jwt';
import userHandler from './handlers/user';
import messageHandler from './handlers/message';

const socketAPI = (io: WebSocketServer) => {
  const onConnection = (socket: Socket) => {
    console.log('Socket connection:', socket.id);
    socket.broadcast.emit('notification', { type: 'blank', nickname: socket.data.user.nickname, msg: 'entered the chat .)' });  
    
    // Handlers
    userHandler(io, socket);
    messageHandler(io, socket);
    
    socket.on('disconnect', () => {
      console.log('Socket disconnetion:', socket.id);
      socket.broadcast.emit('notification', { type: 'blank', nickname: socket.data.user.nickname, msg: 'left the chat .(' }); 
    });
  };

  io.use(async (socket, next) => {
    const validToken = await verifyJwt(socket);
    if (!validToken) return socket.disconnect(true);

    let alreadyConnected = false;
    io.sockets.sockets.forEach(client => {
      if (client.data.user.id === socket.data.user.id) alreadyConnected = true;
    });

    if (alreadyConnected) return socket.disconnect(true);

    next();

  }).on('connection', onConnection);
};

export default socketAPI;