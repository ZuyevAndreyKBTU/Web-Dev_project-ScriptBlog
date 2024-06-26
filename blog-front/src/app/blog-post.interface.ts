import { User } from './user.interface';

export interface BlogPost {
    id: number;
    title: string;
    body: string;
    owner: User;
}
  