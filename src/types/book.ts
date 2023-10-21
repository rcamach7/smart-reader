export type Book = {
  title: string;
  subTitle?: string;
  authors: string[];
  publisher?: string;
  publicationDate?: Date;
  edition?: string;
  pageCount: number;
  genre: string;
  description: string;
  coverImage: {
    small: string;
    normal: string;
  };
  isbn: string;
  language: string;
};
