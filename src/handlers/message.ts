import type { Server as WebSocketServer, Socket } from 'socket.io';
import { getRepository } from 'typeorm';
import { Message } from '../entity/message';
import { validateMessage } from '../utils/validate';

export default function (io: WebSocketServer, socket: Socket) {  
  const messageRepository = getRepository(Message);
  const { id: userId } = socket.data.user;

  const getMessages = async (skip: number) => {
    const total: number = await messageRepository.count();
    const hasMore: boolean = skip < total;

    const messages = await messageRepository
      .createQueryBuilder('msg')
      .select(['msg.id', 'msg.content', 'msg.edited', 'msg.createdAt', 'msg.updatedAt', 'user.id', 'user.nickname'])
      .leftJoin('msg.user', 'user')
      .orderBy('msg.createdAt', 'DESC')
      .take(30)
      .skip(skip)
      .getMany();

    return { messages: messages.reverse(), hasMore };
  };

  // Controllers
  const index = async (skip: number) => {
    if (typeof skip !== 'number') return socket.emit('notification', { type: 'error', msg: 'Invalid skip value' })
    socket.emit('message:index', await getMessages(skip));
  };

  const create = async (content: string) => {
    const validatedContent = validateMessage(content);
    if (!validatedContent) return socket.emit('notification', { type: 'error', msg: 'Message cannot be empty or longer than 2000 characters' });

    try {
      const message = new Message();
  
      message.user = userId;
      message.content = validatedContent;
      
      const { id } = await messageRepository.save(message);
      const newMessage = await messageRepository
        .createQueryBuilder('msg')
        .where({ id })
        .select(['msg.id', 'msg.content', 'msg.edited', 'msg.createdAt', 'msg.updatedAt', 'user.id', 'user.nickname'])
        .innerJoin('msg.user', 'user')
        .getOne();
  
      io.emit('message:show', newMessage);
      socket.broadcast.emit('message:untyping', userId);
      socket.emit('notification', { type: 'success', msg: 'Message created succesfully' });

    } catch(err) {
      socket.emit('notification', { type: 'error' });
    }
  };
  
  const update = async ({ id, content }: Message) => {
    const validatedContent = validateMessage(content);
    if (!validatedContent) return socket.emit('notification', { type: 'error', msg: 'Message cannot be empty or longer than 2000 characters' });

    try {
      const message = await messageRepository.findOne(id, { loadRelationIds: true });
      
      if (!message) return socket.emit('notification', { type: 'success', msg: 'Message not found' });
      if (message.user !== userId) return socket.emit('notification', { type: 'error', msg: 'You are not authorized' });
  
      message.content = validatedContent;
      message.edited = true;
  
      const { id: messageUpdatedId } = await messageRepository.save(message);
      const messageUpdated = await messageRepository
        .createQueryBuilder('msg')
        .where({ id: messageUpdatedId })
        .select(['msg.id', 'msg.content', 'msg.edited', 'msg.createdAt', 'msg.updatedAt', 'user.id', 'user.nickname'])
        .innerJoin('msg.user', 'user')
        .getOne();
  
      io.emit('message:update', messageUpdated);
      socket.broadcast.emit('message:untyping', userId);
      socket.emit('notification', { type: 'success', msg: 'Message updated succesfully' });  

    } catch(err) {
      socket.emit('notification', { type: 'error' });
    }
  };
  
  const destroy = async (id: number) => {
    try {
      const message = await messageRepository.findOne(id, { loadRelationIds: true });
      if (!message) return socket.emit('notification', { type: 'error', msg: 'Message not found' });

      if (message.user !== userId) return socket.emit('notification', { type: 'success', msg: 'You are not authorized' });
      await messageRepository.delete(id);

      io.emit('message:delete', id);
      socket.emit('notification', { type: 'success', msg: 'Message deleted succesfully' });

    } catch(err) {
      socket.emit('notification', { type: 'error' });
    }
  };

  let typingTimeout: NodeJS.Timeout | null = null;

  const typing = () => {
    if (typingTimeout) clearTimeout(typingTimeout);

    socket.broadcast.emit('message:typing', socket.data.user);
    
    typingTimeout = setTimeout(() => {
      socket.broadcast.emit('message:untyping', userId);
    }, 2500);
  };


  // Listeners
  socket.on('message:index', index);
  socket.on('message:create', create);
  socket.on('message:update', update);
  socket.on('message:delete', destroy);
  socket.on('message:typing', typing);
}
