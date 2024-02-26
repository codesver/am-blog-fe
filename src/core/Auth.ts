import CryptoJS from "crypto-js";

export enum Role {
  ADMIN = "ROLE_ADMIN",
  USER = "ROLE_USER",
  GEUST = "ROLE_GUEST",
}

export interface User {
  username: string;
  role: Role;
  token: string;
  expire: number;
}

const encode = (plain: object) =>
  CryptoJS.AES.encrypt(JSON.stringify(plain), "SECRET_KEY").toString();

const decode = (cipher: string) =>
  JSON.parse(
    CryptoJS.AES.decrypt(cipher, "SECRET_KEY").toString(CryptoJS.enc.Utf8)
  );

const Auth = (() => {
  const login = (user: User) => sessionStorage.setItem("user", encode(user));

  const logout = () => sessionStorage.removeItem("user");

  const info = () => {
    try {
      const userSession = sessionStorage.getItem("user");
      if (userSession) {
        const user = decode(userSession) as User;
        if (new Date().getTime() < user.expire) {
          return user;
        }
      }
    } catch (err) {}
    logout();
    return undefined;
  };

  const authenticated = () => {
    const user = info();
    return Boolean(user && new Date().getTime() < user.expire);
  };

  const authorized = (role: Role) => {
    const user = info();
    return user && user.role <= role;
  };

  return {
    login,
    logout,
    info,
    authenticated,
    authorized,
  };
})();

export default Auth;
