import { model, Schema, models } from 'mongoose';

const User = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 255,
  },
  profileImage: {
    type: String,
    default: 'profile_img_1.png',
    enum: ['profile_img_1.png', 'profile_img_2.png', 'profile_img_3.png'],
  },
  shelves: [{ type: Schema.Types.ObjectId, ref: 'Shelf' }],
  savedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

const UserModel = models.User || model('User', User);

export const initializeUserSchema = () => {
  UserModel;
};

export default UserModel;
