import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from '../redux/tokenSlice';
import io from 'socket.io-client';
import { setSocket as setSocketState } from '../socketState';

const useSocketConnection = () => {
  const token = useSelector(getToken);
  const [socketConnection, setSocketConnection] = useState(null);
  const [socket, setSocket] = useState(false);
  const [attempts, setAttempts] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      setSocketConnection(
        io(process.env.REACT_APP_LOCALHOST_API, { auth: { token } })
      );
    } else {
      setSocketConnection(io({ auth: { token } }));
    }
  }, [token]);

  useEffect(() => {
    if (socketConnection) {
      setSocketState(socketConnection);
      if (socketConnection.disconnected) {
        setTimeout(() => {
          if (socketConnection.connected) {
            setSocket(true);
          } else {
            if (attempts === 5) {
              socketConnection.disconnect();
              setSocketConnection(null);
              setSocket(false);
              return setError(true);
            }
            setAttempts((prevNumber) => prevNumber + 1);
          }
        }, 1000);
      } else {
        setSocketState(socketConnection);
        setSocket(true);
      }
    }
  }, [socketConnection, attempts]);

  return { socket, error };
};

export default useSocketConnection;
