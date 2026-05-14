import { profileService } from "@/services/profile.service";
import { User } from "@/types/auth.type";

import { create } from "zustand";

type AuthStore = {
  isLoading?: boolean;
  isAuthenticated?: boolean;
  user?: User;
  setUser?: (user: User) => void;
  refetchUser?: () => Promise<void>;
  logout?: () => void;
};
export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: true,
  isAuthenticated: false,
  user: {} as User,
  setUser: (user: User) => {
    set({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  },
  refetchUser: async () => {
    set({ isLoading: true });
    try {
      const user = await profileService.getProfile();
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      set({
        user: {} as User,
        isAuthenticated: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => {
    set({
      user: {} as User,
      isAuthenticated: false,
      isLoading: false,
    });
  },
}));
