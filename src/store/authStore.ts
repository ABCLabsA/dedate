import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  is_authorized: boolean
  access_token: string | null
  refresh_token: string | null
  setAuth: (params: { access_token: string; refresh_token: string }) => void
  clearAuth: () => void
  isTokenValid: () => boolean
  getAuthHeaders: () => Record<string, string>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      is_authorized: false,
      access_token: null,
      refresh_token: null,
      
      setAuth: ({ access_token, refresh_token }) =>
        set({
          is_authorized: true,
          access_token,
          refresh_token,
        }),
      
      clearAuth: () => 
        set({
          is_authorized: false,
          access_token: null,
          refresh_token: null,
        }),
      
      isTokenValid: () => {
        const { access_token } = get();
        if (!access_token) return false;
        
        try {
          // 简单的token过期检查（JWT格式）
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
    }),
    {
      name: 'dedate-auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)