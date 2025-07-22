import { User } from '@/models/userModels';
import randomNickGenerator from '@/utils/randomNickGenerator';
import { UserCreateFail, UserNotFound } from '@/utils/customError';
import mongoose from 'mongoose';

/**
 * 랜덤 닉네임을 가진 User 생성
 * @returns User Object
 */
export const createUser = async () => {
  // 랜덤 닉네임 생성
  let newNick = '';
  let newTag = 0;

  // 닉네임 생성 제한
  let limit = 10;

  // 중복이 제거된 닉네임 생성
  while (limit > 0) {
    newNick = randomNickGenerator();
    // 중복 확인
    const lastUser = await User.findOne({ nickname: newNick }).sort({
      tag: -1,
    });

    // 중복이 없다면 정지
    if (lastUser === null) {
      break;
    }

    // lastUser tag가 999가 넘는지 확인
    if (lastUser.tag < 999) {
      newTag = lastUser.tag + 1;
      break;
    }
    // 999가 넘으면 그냥 새로운 닉네임을 만듦
    limit--;
  }

  // 생성 리밋을 넘어가면 에러
  if (limit === 0) {
    throw new UserCreateFail();
  }

  const newUser = new User();
  newUser.nickname = newNick;
  newUser.tag = newTag;
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
 * _id로 User의 topScore 업데이트, 랭크 변동
 * @param userID
 * @param newScore
 */
export const updateUserScore = async (userID: string, newScore: number) => {
  // transaction을 통해 all or notthing
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userID).session(session);

    // 유저 검색 실패시 애러 처리
    if (!user) {
      throw new UserNotFound();
    }

    // 최고점수를 넘기면 업데이트, 랭킹 변동
    if (newScore > user.topScore) {
      await User.updateOne(
        { _id: userID },
        { topScore: newScore },
        { session },
      );
    }

    // 점수보다 높은 사람 수 카운트 → 랭킹 계산
    const rank = await User.countDocuments({
      topScore: { $gte: newScore },
    }).session(session);

    await session.commitTransaction();
    session.endSession();

    return rank;
  } catch (error) {
    // 에러가 발생하면 트랜젝션 롤백
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export default { createUser, getUser, getTop100, updateUserScore };
