import { model, Schema, models } from 'mongoose';

const Shelf = new Schema({
  name: String,
  public: { type: Boolean, default: false },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

const ShelfModel = models.Shelf || model('Shelf', Shelf);

export const initializeShelfSchema = () => {
  ShelfModel;
};

export default ShelfModel;
