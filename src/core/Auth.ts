import CryptoJS from "crypto-js";
import { create } from "zustand";

export enum Role {
  ADMIN = 0,
  USER = 1,
}

export interface User {
  username: string;
  role: Role;
  token: string;
  expire: number;
}

interface AuthState {
  user?: User;
  login: (user: User) => void;
  logout: () => void;
  authenticated: () => boolean;
  authorized: (role: Role) => boolean;
}

const useAuth = create<AuthState>((set, get) => {
  const encode = (plain: object) => CryptoJS.AES.encrypt(JSON.stringify(plain), "SECRET_KEY").toString();

  const decode = (cipher: string) => JSON.parse(CryptoJS.AES.decrypt(cipher, "SECRET_KEY").toString(CryptoJS.enc.Utf8));

  const getUser = () => {
    try {
      const userSession = localStorage.getItem("user");

      if (userSession) {
        const user = decode(userSession) as User;

        if (new Date().getTime() < user.expire) {
          return user;
        } else {
          localStorage.removeItem("user");
        }
      }
    } catch (err) {
      localStorage.removeItem("user");
    }
  };

  return {
    user: getUser(),
    login: (user) => {
      set({ user });
      localStorage.setItem("user", encode(user));
    },
    logout: () => {
      set({ user: undefined });
      localStorage.removeItem("user");
    },
    authenticated: () => Boolean(get().user && new Date().getTime() < get().user!.expire),
    authorized: (role) => Boolean(get().user && get().user!.role <= role),
  };
});

export default useAuth;
