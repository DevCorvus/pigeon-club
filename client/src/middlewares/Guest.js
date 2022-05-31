import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../redux/tokenSlice';

export default function Guest({ children }) {
  const token = useSelector(getToken);

  if (token) return <Navigate to="/" replace={true} />;

  return children;
}
