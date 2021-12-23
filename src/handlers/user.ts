import type { Server as WebSocketServer, Socket } from 'socket.io';
import { getRepository } from 'typeorm';
import { User } from '../entity/user';

export default function (io: WebSocketServer, socket: Socket) {
  const userRepository = getRepository(User);
  const { id: userId } = socket.data.user;

  // Handlers
  const onUser = () => {
    socket.emit('user', socket.data.user);
    socket.emit('notification', { type: 'success', msg: 'Login successfull' });
  };

  const onNickname = async (nickname: string) => {
    try {
      const user = await userRepository.findOne(userId);
      if (!user) return socket.emit('notification', { type: 'error', msg: 'User not found' });

      user.nickname = nickname;
      await userRepository.save(user);
      socket.data.user.nickname = nickname;
      
      socket.emit('nickname', nickname);
      socket.emit('notification', { type: 'success', msg: 'Nickname updated successfully' });

    } catch(err) {
      socket.emit('notification', { type: 'error', msg: 'Invalid new Nickname' });
    }
  };
 
  // Listeners
  socket.on('user', onUser);
  socket.on('nickname', onNickname);
}