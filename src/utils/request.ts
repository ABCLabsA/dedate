import axios from 'axios';

// 创建axios实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || 'http://127.0.0.1:8002/api', // 可根据实际情况调整
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器，自动携带JWT Token
instance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers = config.headers || {};
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器，统一处理错误
instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 这里可以根据需要做全局错误提示
    return Promise.reject(error);
  }
);

export default instance;
