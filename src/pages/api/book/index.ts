import { NextApiRequest, NextApiResponse } from 'next';

import { connectToMongoDB } from '@/services/mongobd';
import { BookSchema } from '@/schemas/index';
import { decodeAuthToken } from '@/utils/token';

interface ApiResponse {
  title: string;
  subTitle?: string;
  authors?: string[];
  publisher?: string;
  publicationDate?: Date;
  edition?: string;
  description?: string;
  pageCount?: number;
  coverImageLinks?: {
    small?: string;
    normal?: string;
  };
  isbn?: string;
  isbn13?: string;
  genre?: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let decodedAuthToken;
  try {
    decodedAuthToken = await decodeAuthToken(req);
  } catch (error) {
    return res.status(400).json({ message: 'User not authenticated', error });
  }

  switch (req.method) {
    case 'POST':
      const {
        title,
        subTitle,
        authors,
        publisher,
        publicationDate,
        edition,
        description,
        pageCount,
        coverImageLinks,
        isbn,
        isbn13,
        genre,
      } = req.body as ApiResponse;

      if (!title) {
        res
          .status(400)
          .json({ message: 'Please provide a title field to create a book.' });
      }

      try {
        await connectToMongoDB();

        const newBook = new BookSchema({
          title,
          subTitle,
          authors,
          publisher,
          publicationDate,
          edition,
          description,
          pageCount,
          coverImageLinks,
          isbn,
          isbn13,
          genre,
        });
        const book = await newBook.save();
        const bookObject = book.toObject();

        return res
          .status(201)
          .json({ message: 'Book created successfully', book: bookObject });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: 'Error occurred while creating new book' });
      }

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
