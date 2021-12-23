import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setNickname } from '../redux/userSlice';
import { getSocket } from '../socketState';
import { toast } from 'react-hot-toast';

const useSocketUser = () => {
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();
  const socket = getSocket();

  useEffect(() => {

    // Handlers
    const onUser = (user) => {
      dispatch(setUser(user));
      setDone(true);
    };
  
    const onNickname = (nickname) => {
      dispatch(setNickname(nickname));
    };
  
    const onNotification = ({ type, msg, nickname }) => {
      if (type === 'success') {
        toast.success(msg);
      } else if (type === 'error') {
        toast.error(msg ? msg : 'Unexpected error');
      } else if (nickname) {
        toast(_ => (
          <p><strong>{nickname}</strong> {msg}</p>
        ));
      } else {
        toast(msg);
      }
    };

    // Listeners
    socket.emit('user');
    socket.on('user', onUser);
    socket.on('nickname', onNickname);
    socket.on('notification', onNotification);

  }, [socket, dispatch]);

  return done;
};

export default useSocketUser;