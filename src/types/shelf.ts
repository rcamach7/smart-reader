import Book from './book';
import User from './user';

type Shelf = {
  _id: string;
  name: string;
  description: string;
  public: boolean;
  creator: User;
  books: Book[];
  likes: User[];
  created: Date;
};

export default Shelf;
