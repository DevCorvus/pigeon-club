import React from 'react';
import Chat from '../pages/Chat';
import Loading from '../components/Loading';
import useSocketUser from '../hooks/useSocketUser';

export default function User() {
  const done = useSocketUser();
  if (!done) return <Loading msg={'Loading User'} />;
  return <Chat />;
}
