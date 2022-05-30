import { db } from '../core/database';
import { Message } from '../entity/Message';
import { User } from '../entity/User';

export const userRepository = db.getRepository(User);
export const messageRepository = db.getRepository(Message);
