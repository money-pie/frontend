import { Kind } from './constants';

export interface UserState extends User {
  token: string | null;
  error: string;
};

export interface User {
  id: string | null;
  login: string;
  email: string;
  notification: boolean;
  aim: number;
  subId: string | null;
  groupId: string | null;
  personal: boolean;
  kind: Kind;
  page: number;
}

