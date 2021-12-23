import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getSocket } from '../socketState';
import Message from './Message';

export default function MessageList({ messages, hasMore, scrollDown }) {
  const socket = getSocket()
  const chatRef = useRef(null);
  const [messagesToRender, setMessagesToRender] = useState([]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [scrollDown]);

  const observer = useRef(null);
  const firstMessageRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        socket.emit('message:index', messages.length);
      }
    });
    if (node) observer.current.observe(node);
  }, [messages.length, socket, hasMore]);

  const prevMessage = useRef(null);
  useEffect(() => {
    prevMessage.current = null;

    setMessagesToRender(messages.map((message, index) => {
      const firstMessage = prevMessage.current === null;
      let differentUserId = null;
      let lastMessageTooOld = null;
      let merge = true;

      if (!firstMessage) {
        differentUserId = prevMessage.current.user.id !== message.user.id;
        lastMessageTooOld = parseInt(parseInt((Date.parse(message.createdAt) - Date.parse(prevMessage.current.createdAt)) / 1000) / 60) >= 5; // 5 Minutes
      }

      if (firstMessage || differentUserId || lastMessageTooOld) {
        merge = false;
        prevMessage.current = message;
      }
      const messageJsx = <Message key={message.id} {...message} merge={merge} />;

      if (index > 0) return messageJsx;
      return <div key={message.id} ref={firstMessageRef}>{messageJsx}</div>;
    }));
    
  }, [firstMessageRef, messages]);

  return (
    <div ref={chatRef} className="no-scrollbar flex flex-col overflow-scroll">
      {hasMore && (
        <div className="text-indigo-400 mx-auto">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      {messagesToRender}
    </div>
  );
}
