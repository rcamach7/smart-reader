import { Book } from './book';

export type Shelve = {
  name: string;
  created: Date;
  books: Book[];
};
