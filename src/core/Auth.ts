import CryptoJS from "crypto-js";

export enum Role {
  ADMIN = 0,
  USER = 1,
}

export interface User {
  username: string;
  name: string;
  role: Role;
  token: string;
  expire: number;
}

const Auth = (() => {
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
    user: getUser,
    login: (user: User) => localStorage.setItem("user", encode(user)),
    logout: () => localStorage.removeItem("user"),
    authenticated: () => {
      const user = getUser();
      return Boolean(user && new Date().getTime() < user!.expire);
    },
    authorized: (role: Role) => {
      const user = getUser();
      return Boolean(user && user!.role <= role);
    },
  };
})();

export default Auth;
