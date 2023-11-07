import { model, Schema, models } from 'mongoose';

const User = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
});

const UserModel: any = models.User || model('User', User);

export const initializeUserSchema = () => {
  UserModel;
};

export default UserModel;
