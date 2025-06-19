import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  nickname: {
    required: true,
    unique: true,
    type: String,
  },
  topScore: {
    type: Number,
    default: 0,
  },
  rank: {
    type: Number,
    default: 0,
  },
});

const User = model('User', UserSchema);

export { User };
