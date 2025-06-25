import { User } from '@/models/userModels';

/**
 * 랜덤 닉네임을 가진 User 생성
 * @returns User Object
 */
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

/**
 * _id로 User를 검색
 * @param userID
 * @returns User Object | null
 */
export const getUser = async (userID: string) => {
  const user = await User.findById(userID);
  return user;
};

/**
 * top score 상위 100명의 유저 검색
 * @returns User Object[]
 */
export const getTop100 = async () => {
  const topUsers = await User.find().sort({ topScore: -1 }).limit(100);
  return topUsers;
};

/**
 * _id로 User의 topScore 업데이트
 * @param userID
 * @param newScore
 */
export const updateUserScore = async (userID: string, newScore: number) => {
  const user = await User.findById(userID);

  if (user && newScore > user.topScore) {
    await User.updateOne({ _id: userID });
  } else {
    // 유저가 없으면 에러 처리
  }
};

export default { createUser, getUser, getTop100, updateUserScore };
