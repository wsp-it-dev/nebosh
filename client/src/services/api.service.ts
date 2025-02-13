import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token') || '';

export const baseURL = 'http://localhost:5000';
// export const baseURL = 'https://neboshuk.nequal.co.uk';

const apiService = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default apiService;

export interface VerificationIdent {
  certificate: {
    name: string;
    number: string;
    issueDate: string;
  };
  student: {
    name: string;
  };
  request: {
    id: number;
    ident: string;
    name: string;
    organization: string;
    email: string;
    timestamp: string;
  };
}
