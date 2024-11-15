import { AuthTokens } from "@/types/auth";
import { clearUser, getUser, setUser as localSetUser } from "@/utils/user";
import { create } from "zustand";

interface UserStoreProps {
  user: any;
  hasAccess: boolean;
  setUser: (user: AuthTokens) => void;
  setClearUser: () => void;
}

export const useUserStore = create<UserStoreProps>(set => ({
  user: getUser(),
  hasAccess: !!getUser()?.access,
  setUser: user => {
    localSetUser(user);
    set({ hasAccess: true, user: user });
  },
  setClearUser: () => {
    clearUser();
    set({ hasAccess: false, user: undefined });
  },
}));
