import { useEffect, useRef } from 'react';
import { getSocket } from '../socketState';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/userSlice';

const useSocketTyping = (inputValue) => {
  const socket = getSocket();
  const user = useSelector(getUser);
  const afterFirstRenderRef = useRef(false);

  useEffect(() => {
    if (afterFirstRenderRef.current) {
      socket.emit('message:typing', user);
    } else {
      afterFirstRenderRef.current = true;
    }
  }, [socket, inputValue, user]);
};

export default useSocketTyping;
