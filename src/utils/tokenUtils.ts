import { useAuthStore } from '@/store/authStore';

/**
 * 检查token是否即将过期（比如5分钟内过期）
 */
export const isTokenExpiringSoon = (bufferMinutes: number = 5): boolean => {
  const authStore = useAuthStore.getState();
  const { expires_at } = authStore;
  
  if (!expires_at) return false;
  
  const currentTime = Math.floor(Date.now() / 1000);
  const bufferSeconds = bufferMinutes * 60;
  
  return expires_at - currentTime <= bufferSeconds;
};

/**
 * 主动刷新token（在token即将过期时调用）
 */
export const proactiveRefreshToken = async (): Promise<boolean> => {
  const authStore = useAuthStore.getState();
  
  // 检查token是否即将过期
  if (isTokenExpiringSoon()) {
    console.log('Token即将过期，主动刷新...');
    return await authStore.refreshAccessToken();
  }
  
  return true;
};

/**
 * 获取token剩余有效时间（秒）
 */
export const getTokenRemainingTime = (): number => {
  const authStore = useAuthStore.getState();
  const { expires_at } = authStore;
  
  if (!expires_at) return 0;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return Math.max(0, expires_at - currentTime);
};

/**
 * 格式化token剩余时间
 */
export const formatTokenRemainingTime = (): string => {
  const remainingSeconds = getTokenRemainingTime();
  
  if (remainingSeconds === 0) return '已过期';
  
  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;
  
  if (hours > 0) {
    return `${hours}小时${minutes}分钟`;
  } else if (minutes > 0) {
    return `${minutes}分钟${seconds}秒`;
  } else {
    return `${seconds}秒`;
  }
}; 