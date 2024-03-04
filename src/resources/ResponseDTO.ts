import { Role } from "../core/Auth";

export interface LoginResponse {
  username: string;
  name: string;
  role: keyof typeof Role;
  expire: number;
  token: `Bearer ${string}`;
}
