import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from '../redux/tokenSlice';
import io from 'socket.io-client';
import { setSocket as setSocketState } from '../socketState';

const useSocketConnection = () => {
  const token = useSelector(getToken);
  const [socket, setSocket] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const socketConnection = io(
      process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_LOCALHOST_API
        : undefined,
      { auth: { token } }
    );

    let connectionFailedTimeout;

    socketConnection.on('connect', () => {
      clearTimeout(connectionFailedTimeout);
      setSocketState(socketConnection);
      setSocket(true);
    });

    connectionFailedTimeout = setTimeout(() => {
      socketConnection.disconnect();
      setSocketState(null);
      setSocket(false);
      setError(true);
    }, 5000);
  }, [token]);

  return { socket, error };
};

export default useSocketConnection;
