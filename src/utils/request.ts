import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { showError } from './toast';

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
    // 从authStore获取认证头
    const authStore = useAuthStore.getState();
    const authHeaders = authStore.getAuthHeaders();
    
    // 设置认证头
    if (authHeaders.Authorization) {
      config.headers.Authorization = authHeaders.Authorization;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器，统一处理错误
instance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { response } = error;
    
    // 处理401未授权错误
    if (response?.status === 401) {
      const authStore = useAuthStore.getState();
      
      // 清除认证状态
      authStore.clearAuth();
      showError('登录查看项目详情');
      
      // 可以在这里添加重定向到登录页的逻辑
      // window.location.href = '/login';
    }
    
    // 处理其他错误
    if (response?.data?.message) {
      // 可以在这里添加全局错误提示
      console.error('API Error:', response.data.message);
    }
    
    return Promise.reject(error);
  }
);

export default instance;
