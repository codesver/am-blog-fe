export interface LoginResponse {
  username: string;
  role: "ADMIN" | "USER";
  expire: number;
  token: `Bearer ${string}`;
}
