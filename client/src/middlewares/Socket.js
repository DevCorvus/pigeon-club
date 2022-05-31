import React from 'react';
import Loading from '../components/Loading';
import User from '../middlewares/User';
import useSocketConnection from '../hooks/useSocketConnection';

export default function Socket() {
  const { socket, error } = useSocketConnection();
  if (!socket) return <Loading error={error} msg={'Establishing Connection'} />;
  return <User />;
}
