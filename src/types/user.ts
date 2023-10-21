import { Shelve } from './shelve';
import { Book } from './book';

export type User = {
  name: string;
  email: string;
  avatar?: string;
  library: Shelve[];
  favorites: Book[];
  read: Book[];
  reading: Book[];
};
