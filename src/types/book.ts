type Book = {
  title: string;
  subTitle?: string;
  authors: string[];
  publisher?: string;
  publicationDate?: Date;
  edition?: string;
  description: string;
  pageCount: number;
  coverImageLinks?: {
    small?: string;
    normal?: string;
  };
  isbn?: string;
  isbn13?: string;
  genres: string[];
};

export default Book;
