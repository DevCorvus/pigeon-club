import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../redux/tokenSlice';

export default function Protected({ children }) {
  const token = useSelector(getToken);

  if (!token) return <Navigate to="/login" replace={true} />;

  return children;
}
