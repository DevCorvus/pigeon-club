import React from 'react';
import { useDispatch } from 'react-redux';
import { resetToken } from '../redux/tokenSlice';
import { resetUser } from '../redux/userSlice';
import { toast } from 'react-hot-toast';
import { getSocket, setSocket } from '../socketState';
import Cookies from 'js-cookie';

export default function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    const socket = getSocket();
    socket.disconnect();
    setSocket(null);
    dispatch(resetToken());
    dispatch(resetUser());
    Cookies.remove('token');
    toast.success('Logout successfull');
  };

  return (
    <button
      title="Logout"
      className="flex items-center hover:text-indigo-50 focus:text-indigo-50 transition"
      onClick={handleLogout}
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    </button>
  );
}
