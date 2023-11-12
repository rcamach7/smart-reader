import { model, Schema, models } from 'mongoose';

const BookSchema = new Schema({
  title: { type: String, required: true, unique: true },
  subTitle: String,
  authors: [String],
  publisher: String,
  publicationDate: Date,
  edition: String,
  description: String,
  pageCount: { type: Number, default: 0 },
  coverImageLinks: {
    small: String,
    normal: String,
  },
  isbn: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(97(8|9))?\d{9}(\d|X)$/.test(v); // Simple ISBN validation
      },
      message: (props) => `${props.value} is not a valid ISBN!`,
    },
  },
  isbn13: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(97(8|9))?\d{12}$/.test(v); // Simple ISBN-13 validation
      },
      message: (props) => `${props.value} is not a valid ISBN-13!`,
    },
  },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
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
