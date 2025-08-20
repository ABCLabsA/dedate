import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';
import { refreshToken } from '@/api/auth';

interface AuthState {
  is_authorized: boolean
  access_token: string | null
  refresh_token: string | null
  expires_at: number | null
  setAuth: (params: { access_token: string; refresh_token: string; expires_at?: number }) => void
  clearAuth: () => void
  isTokenValid: () => boolean
  getAuthHeaders: () => Record<string, string>
  refreshAccessToken: () => Promise<boolean>
  updateTokens: (access_token: string, refresh_token: string, expires_at?: number) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      is_authorized: false,
      access_token: null,
      refresh_token: null,
      expires_at: null,
      
      setAuth: ({ access_token, refresh_token, expires_at }) =>
        set({
          is_authorized: true,
          access_token,
          refresh_token,
          expires_at: expires_at || null,
        }),
      
      clearAuth: () => 
        set({
          is_authorized: false,
          access_token: null,
          refresh_token: null,
          expires_at: null,
        }),
      
      isTokenValid: () => {
        const { access_token, expires_at } = get();
        if (!access_token) return false;
        
        // 如果有expires_at，优先使用它
        if (expires_at) {
          const currentTime = Math.floor(Date.now() / 1000);
          return expires_at > currentTime;
        }
        
        // 否则解析JWT token
        try {
          const payload = JSON.parse(atob(access_token.split('.')[1]));
          const currentTime = Math.floor(Date.now() / 1000);
          return payload.exp > currentTime;
        } catch {
          return false;
        }
      },
      
      getAuthHeaders: () => {
        const { access_token } = get();
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        if (access_token) {
          headers['Authorization'] = `Bearer ${access_token}`;
        }
        
        return headers;
      },

      refreshAccessToken: async () => {
        const { refresh_token } = get();
        if (!refresh_token) {
          return false;
        }

        try {
          const response: any = await refreshToken(refresh_token);
          if (response.code === 200 && response.data?.session) {
            const { access_token, refresh_token: new_refresh_token, expires_at } = response.data.session;
            get().updateTokens(access_token, new_refresh_token, expires_at);
            return true;
          }
          return false;
        } catch (error) {
          console.error('Token refresh failed:', error);
          get().clearAuth();
          return false;
        }
      },

      updateTokens: (access_token: string, refresh_token: string, expires_at?: number) => {
        set({
          access_token,
          refresh_token,
          expires_at: expires_at || null,
        });
      },
    }),
    {
      name: 'dedate-auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)