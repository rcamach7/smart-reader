import { model, Schema, models } from 'mongoose';

const BookSchema = new Schema({
  googleId: String,
  googleSelfLink: String,
  previewLink: String,
  infoLink: String,
  title: { type: String, required: true, unique: true },
  authors: [String],
  publisher: String,
  publicationDate: Date,
  edition: String,
  description: String,
  language: String,
  isbn: String,
  isbn13: String,
  imageLinks: {
    smallThumbnail: String,
    thumbnail: String,
  },
  categories: [String],
  printType: String,
});

BookSchema.index({ title: 1, authors: 1, isbn: 1 });

const BookModel = models.Book || model('Book', BookSchema);

export const initializeBookSchema = () => {
  try {
    BookModel;
  } catch (error) {
    console.error('Error initializing Book schema:', error);
  }
};

export default BookModel;
