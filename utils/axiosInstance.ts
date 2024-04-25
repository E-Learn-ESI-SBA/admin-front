import { base_url } from '@/config/constants';
import axios, { HeadersDefaults, AxiosRequestHeaders } from 'axios';

const axiosClient = axios.create({
    withCredentials: true, 
    baseURL: base_url,
});

axiosClient.defaults.headers = Object.assign({}, axiosClient.defaults.headers, {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  


export default axiosClient;