import Cookies from "cookies";
import { User } from "../database/entities/user";

export type Ad = {
  id: number;
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  createdAt: string;
  category: { id: number };
  tags?: { id: number }[];
};

export type Category = {
  title: string;
};

export type Tag = {
  title: string;
};

export type Context = {
  cookies: Cookies;
  user: User | null | undefined;
};

export type AuthContext = {
    user: User;
};