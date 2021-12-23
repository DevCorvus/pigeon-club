import React from 'react';
import { getSocket } from '../socketState';
import { toast } from 'react-hot-toast';

export default function DeleteMessage({ toast: t, id }) {
  const socket = getSocket();

  const handleDelete = () => {
    toast.dismiss(t.id);
    socket.emit('message:delete', id);
  };

  return (
    <div>
      <p>Do you really want to delete that message?</p>
      <div className="flex gap-4 mt-2">
        <button
          onClick={handleDelete}
          className="w-full py-1 border text-indigo-400 border-indigo-400 rounded-md hover:bg-indigo-400 hover:text-white"
        >
          YES
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full py-1 border text-indigo-400 border-indigo-400 rounded-md hover:bg-indigo-400 hover:text-white"
        >
          NO
        </button>
      </div>
    </div>
  );
}
