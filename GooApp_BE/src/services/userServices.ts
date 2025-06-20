import { User } from '@/models/userModels';

export const createUser = async () => {
  // 임시 닉네임 생성 함수
  const createRandomNick = () => {
    return 'testNick';
  };

  const newUser = new User();
  newUser.nickname = createRandomNick();
  await newUser.save();

  return newUser.toObject();
};

export default { createUser };
