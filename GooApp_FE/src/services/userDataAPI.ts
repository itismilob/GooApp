import { UserDataType } from '@/types/dataTypes';
import { customAxios } from './customAxios';

/**
 * 서버에 유저 최고점수 전송 -> 현재 rank 반환
 * @param userData
 * @param score
 * @returns newRank : number
 */
export async function getRank(userData: UserDataType) {
  // 더미 - 현재 로컬 유저 데이터 사용
  // const newUserData = localUserData;
  try {
    // 서버에 전송
    const res = await customAxios.put(`users/score`, {
      userID: userData._id,
      score: userData.topScore,
    });
    return res.data.rank;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 서버에서 랭킹 리스트 가져옴
 * @returns UserData List
 */
export async function getRankList() {
  // 더미 데이터 사용
  // const rank: UserDataType[] = rankDataJSON;
  try {
    // 서버에서 가져오기
    const res = await customAxios.get(`users/ranks`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 유저 생성
 * @returns UserData
 */
export async function createUser() {
  // 더미 닉네임 입력
  // setUserData(userDataJSON);
  try {
    // 서버 연결 - 유저 생성
    const res = await customAxios.post(`users`);

    if (res.data) {
      const newUser = { ...res.data, topScore: 0 };
      return newUser;
    }
  } catch (error) {
    console.error(error);
  }
}

export default { getRank, getRankList, createUser };
