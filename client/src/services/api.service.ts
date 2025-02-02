import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token') || '';

export const baseURL = 'http://localhost:5000';
// export const baseURL = "";

const apiService = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default apiService;
