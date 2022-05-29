import React, { useState, useRef, useEffect } from 'react';
import { getSocket } from '../socketState';
import TextareaAutosize from 'react-textarea-autosize';
import useSocketTyping from '../hooks/useSocketTyping';

export default function CreateMessageForm({ setScrollDown }) {
  const socket = getSocket();
  const [content, setContent] = useState('');
  const [focus, setFocus] = useState(false);
  const textareaRef = useRef(null);

  const sendMessage = () => {
    socket.emit('message:create', content);
    setContent('');
    setFocus((prevFocus) => !prevFocus);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e) => {
    setTimeout(() => {
      if (!e.shiftKey && e.key === 'Enter') {
        sendMessage();
      }
    }, 10);
  };

  useEffect(() => {
    setScrollDown((prevState) => !prevState);
  }, [content, setScrollDown]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [focus]);

  useSocketTyping(content);

  return (
    <form className="w-full mt-2" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label className="text-gray-400" htmlFor="content">
          Message
        </label>
        <div className="flex gap-4">
          <TextareaAutosize
            ref={textareaRef}
            className="w-full p-2 border border-indigo-400 rounded-md outline-none resize-none"
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            value={content}
            name="content"
            id="content"
            maxLength={2000}
            placeholder="Write your message here..."
          />
          <div title="Send your Message" className="flex flex-col justify-end">
            <button className="btn-primary" type="submit">
              Send
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
