import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/tokenSlice';
import Cookies from 'js-cookie';

const useAuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) dispatch(setToken(token));
  }, [dispatch]);
};

export default useAuthInitializer;
