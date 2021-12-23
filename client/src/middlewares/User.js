import React from 'react';
import useSocketUser from '../hooks/useSocketUser';
import Chat from '../pages/Chat';
import Loading from '../components/Loading';

export default function User() {
  const done = useSocketUser();
  if (!done) return <Loading msg={'Loading User'} />;
  return <Chat />;
}
