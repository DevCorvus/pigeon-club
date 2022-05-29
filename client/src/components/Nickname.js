import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/userSlice';
import { toast } from 'react-hot-toast';
import EditNickname from './EditNickname';

export default function Nickname() {
  const { nickname } = useSelector(getUser);

  return (
    <>
      {nickname && (
        <div className="flex items-center gap-2">
          <span className="select-none" title="Your nickname">
            {nickname}
          </span>
          <button
            title="Edit Nickname"
            className="p-0.5 rounded-full text-white hover:bg-white focus:bg-white hover:text-indigo-400 focus:text-indigo-400 transition"
            onClick={() =>
              toast((t) => <EditNickname toast={t} />, { duration: 60000 })
            }
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
