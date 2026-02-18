import { Md5 } from "ts-md5";

export type User = {
  id: string;
  username: string;
  email: string;
  token: string | null;
  lastAction: number;
  check: string;
};

export function calcCheck(id: string, key: string): string {
  return Md5.hashStr(`${id}:${key}`);
}

export function createUser(
  username: string,
  email: string,
  password: string,
): User {
  const id = Md5.hashStr(`${Date.now()}-${Math.random()}`);
  return {
    id,
    username,
    email,
    token: null,
    lastAction: Date.now(),
    check: calcCheck(id, password),
  };
}
