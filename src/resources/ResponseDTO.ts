export interface LoginResponse {
  username: string;
  name: string;
  role: "ADMIN" | "USER";
  expire: number;
  token: `Bearer ${string}`;
}
