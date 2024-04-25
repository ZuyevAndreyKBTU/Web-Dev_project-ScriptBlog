import { User } from './user.interface';

export interface Category {
    id: number;
    name: string;
    owner: User;
  }