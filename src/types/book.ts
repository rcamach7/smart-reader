type Book = {
  googleId?: string;
  googleSelfLink?: string;
  previewLink?: string;
  infoLink?: string;
  title: string;
  authors: string[];
  publisher?: string;
  publicationDate?: Date;
  edition?: string;
  description: string;
  language?: string;
  isbn?: string;
  isbn13?: string;
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
  categories?: string[];
  printType?: string;
};

export default Book;
