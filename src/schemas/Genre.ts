import { model, Schema, models } from 'mongoose';

const Genre = new Schema({
  name: String,
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

const GenreModel = models.Genre || model('Genre', Genre);

export const initializeGenreSchema = () => {
  GenreModel;
};

export default GenreModel;
