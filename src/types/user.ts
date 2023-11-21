import Shelf from './shelf';
import Book from './book';

type UserType = 'admin' | 'standard' | 'demo';

type User = {
  _id: string;
  username: string;
  shelves: Shelf[];
  savedBooks: Book[];
  profileImage: string;
  type: UserType;
};

export default User;
