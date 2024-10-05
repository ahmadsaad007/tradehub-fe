import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://your-api-domain.com',
});

export const login = (data) => instance.post('/login', data);
export const signup = (data) => instance.post('/signup', data);
export const getUserData = () =>
  instance.get('/user', {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
  });
