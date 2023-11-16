import Shelf from './shelf';
import Book from './book';

type User = {
  _id: string;
  username: string;
  shelves: Shelf[];
  savedBooks: Book[];
};

export default User;
