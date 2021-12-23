import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../redux/tokenSlice';
import Nickname from './Nickname';
import Logout from './Logout';

export default function Navbar() {
  const token = useSelector(getToken);

  return (
    <nav className="relative z-50 bg-indigo-400 text-white font-semibold p-2">
      <div className="flex items-center justify-between mx-4">
        <span className="select-none">{token ? 'Chat' : 'Pigeon Club'}</span>
        <Nickname />
        <ul className="flex items-center gap-4">
          {token ? (
            <li>
              <Logout />
            </li>
          ) : (
            <>
              <li>
                <Link className="focus:text-indigo-50 hover:text-indigo-50 transition" to="login">Login</Link>
              </li>
              <li>
                <Link className="focus:text-indigo-50 hover:text-indigo-50 transition" to="register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
