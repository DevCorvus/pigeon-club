import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/tokenSlice';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const useOnSubmit = ({ route = '' }) => {
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const {
        data: { token },
      } = await axios.post(
        `${
          process.env.NODE_ENV !== 'production'
            ? process.env.REACT_APP_LOCALHOST_API
            : ''
        }/api/${route}`,
        data
      );

      dispatch(setToken(token));
      Cookies.set('token', token, { expires: 7 });

      if (route === 'register') toast.success('Register successfull');
    } catch (err) {
      if (err.response && err.response.data)
        return toast.error(err.response.data);
      toast.error('Unexpected error');
    }
  };

  return onSubmit;
};

export default useOnSubmit;
