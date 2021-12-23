import React, { useState } from 'react';
import { getSocket } from '../socketState';
import TextareaAutosize from 'react-textarea-autosize';
import useSocketTyping from '../hooks/useSocketTyping';

export default function EditMessageForm({ id, content: prevContent, setEdit }) {
  const socket = getSocket();
  const [content, setContent] = useState(prevContent);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message:update', { id, content });
    setContent('');
    setEdit(false);
  };

  useSocketTyping(content);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label hidden htmlFor="content">Edit</label>
        <TextareaAutosize
          className="w-full p-2 border border-indigo-400 rounded-md outline-none resize-none"
          onChange={e => setContent(e.target.value)}
          value={content}
          name="content"
          id="content"
          maxLength={2000}
          placeholder="Edit your message here..."
        />
      </div>
      <div className="flex gap-2 text-indigo-300">
        <button className="hover:text-indigo-400 focus:text-indigo-400 transition" onClick={() => setEdit(false)} type="button">
          Cancel
        </button>
        <button className="hover:text-indigo-400 focus:text-indigo-400 transition" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
