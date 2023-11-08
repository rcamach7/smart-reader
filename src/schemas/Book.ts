import { model, Schema, models } from 'mongoose';

const Book = new Schema({
  title: String,
  author: String,
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
});

const BookModel = models.Book || model('Book', Book);

export const initializeBookSchema = () => {
  BookModel;
};

export default BookModel;
