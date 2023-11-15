import { model, Schema, models } from 'mongoose';

const Shelf = new Schema({
  name: { type: String, required: false },
  description: String,
  public: { type: Boolean, default: false, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const ShelfModel = models.Shelf || model('Shelf', Shelf);

export const initializeShelfSchema = () => {
  ShelfModel;
};

export default ShelfModel;
