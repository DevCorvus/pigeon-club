import { useState, useEffect, useRef } from 'react';
import { getSocket } from '../socketState';

const useSocketMessages = () => {
  const socket = getSocket();
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState([]);
  const [hasMore, setHasMore] = useState(null);
  const [scrollDown, setScrollDown] = useState(false);
  const firstMessages = useRef(true);

  // Handlers
  const onMessages = ({ messages, hasMore }) => {
    setHasMore(hasMore);
    setMessages(prevMessages => [...messages, ...prevMessages]);
    if (firstMessages.current) {
      setScrollDown(prevState => !prevState);
      firstMessages.current = false;
    };
  };

  const onShowMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
    setScrollDown(prevState => !prevState);
  };

  const onDeleteMessage = (id) => {
    setMessages(prevMessages => {
      return prevMessages.filter(message => message.id !== id);
    });
  };
  
  const onUpdateMessage = ({ id, content, edited, updatedAt }) => {
    setMessages(prevMessages => {
      return prevMessages.map(message => {
        if (message.id === id) {
          message.content = content;
          message.edited = edited;
          message.updatedAt = updatedAt;
        }
        return message;
      });
    });
  };

  const onTypingMessage = (userTyping) => {
    setTyping(prevTyping => {
      const typings = prevTyping.filter(prevUserTyping => prevUserTyping.id !== userTyping.id);
      return [...typings, userTyping];
    });
    setScrollDown(prevState => !prevState);
  };

  const onUntypingMessage = (userId) => {
    setTyping(prevTyping => prevTyping.filter(userTyping => userTyping.id !== userId));
  };

  // Listeners
  useEffect(() => {
    socket.on('message:index', onMessages);
    socket.on('message:show', onShowMessage);
    socket.on('message:delete', onDeleteMessage);
    socket.on('message:update', onUpdateMessage);
    socket.on('message:typing', onTypingMessage);
    socket.on('message:untyping', onUntypingMessage);
    socket.emit('message:index', 0);
  }, [socket]);

  return { messages, typing, hasMore, scrollDown, setScrollDown };
};

export default useSocketMessages;