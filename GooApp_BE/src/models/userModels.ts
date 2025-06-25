import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  tag: {
    type: Number,
    required: true,
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

// nickname, tag 조합으로 유니크한 인덱스 생성
UserSchema.index({ nickname: 1, tag: 1 }, { unique: true });

const User = model('User', UserSchema);

export { User };
