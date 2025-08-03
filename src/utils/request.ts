import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { showWarning } from './toast';

// 创建axios实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || 'http://127.0.0.1:8002/api', // 可根据实际情况调整
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 用于防止重复刷新token的标志
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

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
    const { response, config } = error;
    
    // 处理401未授权错误
    if (response?.status === 401) {
      const authStore = useAuthStore.getState();
      
      // 如果当前请求是刷新token的请求，直接清除认证状态
      if (config.url?.includes('/auth/refresh-token')) {
        authStore.clearAuth();
        showWarning('登录已过期，请重新登录');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        return Promise.reject(error);
      }
      
      // 如果正在刷新token，将请求加入队列
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return instance(config);
        }).catch((err) => {
          return Promise.reject(err);
        });
      }
      
      isRefreshing = true;
      
      try {
        // 尝试刷新token
        const refreshSuccess = await authStore.refreshAccessToken();
        
        if (refreshSuccess) {
          // 刷新成功，更新当前请求的认证头
          const newAuthHeaders = authStore.getAuthHeaders();
          config.headers.Authorization = newAuthHeaders.Authorization;
          
          // 处理队列中的请求
          processQueue(null, newAuthHeaders.Authorization);
          
          // 重试当前请求
          return instance(config);
        } else {
          // 刷新失败，清除认证状态
          authStore.clearAuth();
          showWarning('登录已过期，请重新登录');
          
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
          
          processQueue(error, null);
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // 刷新token时出错
        authStore.clearAuth();
        showWarning('登录已过期，请重新登录');
        
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
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
