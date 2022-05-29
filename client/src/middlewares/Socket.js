import React from 'react';
import useSocketConnection from '../hooks/useSocketConnection';
import User from '../middlewares/User';
import Loading from '../components/Loading';

export default function Socket() {
  const { socket, error } = useSocketConnection();
  if (!socket) return <Loading error={error} msg={'Establishing Connection'} />;
  return <User />;
}
