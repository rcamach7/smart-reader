import Book from './book';
import User from './user';

type Shelf = {
  name: string;
  description: string;
  public: boolean;
  creator: User;
  books: Book[];
  likes: User[];
};

export default Shelf;
