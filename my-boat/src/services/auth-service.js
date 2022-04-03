import axios from 'axios';
import store from '../store';
import * as authSlice from '../store/auth';

const requester = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const login = async ({ email, password }, redirectTo) => {
  const { data, status } = await requester.post('/login', { email, password });

  if (status === 200) {
    const { user, token } = data;
    const reduxAction = authSlice.login({ user, token, redirectTo });
    store.dispatch(reduxAction);
    return true;
  }

  throw new Error(data.message);
};

const checkEmail = async (email) => {
  const { data } = await requester.get(`/check-email?email=${email}`);
  return data.available;
};

const register = async (body) => {
  const { data, status } = await requester.post('/register', body);

  if (status === 200) {
    const { user, token } = data;
    const reduxAction = authSlice.login({ user, token });
    store.dispatch(reduxAction);
    return true;
  }

  throw new Error(data.message);
};

export default {
  login,
  checkEmail,
  register,
};
