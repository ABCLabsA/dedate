import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CommentUser } from '@/types/comment';

interface UserState {
  currentUser: CommentUser | null;
  setCurrentUser: (user: CommentUser) => void;
  clearCurrentUser: () => void;
  isLoggedIn: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      
      setCurrentUser: (user: CommentUser) =>
        set({
          currentUser: user,
        }),
      
      clearCurrentUser: () =>
        set({
          currentUser: null,
        }),
      
      isLoggedIn: () => {
        const { currentUser } = get();
        return currentUser !== null;
      },
    }),
    {
      name: 'dedate-user-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

// 默认用户信息（用于开发测试）
export const getDefaultUser = (): CommentUser => ({
  id: "default-user-id",
  name: "默认用户",
  avatar: "https://api.multiavatar.com/default-user.svg"
}); 