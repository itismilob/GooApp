import { UserDataType } from '@/types/dataTypes';
import { customAxios } from './customAxios';

/**
 * 서버에 유저 최고점수 전송 -> 현재 rank 반환
 * @param userData
 * @param score
 * @returns newRank : number
 */
export async function getRank(userData: UserDataType) {
  try {
    // 더미 - 현재 로컬 유저 데이터 사용
    // const newUserData = localUserData;

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
  try {
    // 더미 데이터 사용
    // const rank: UserDataType[] = rankDataJSON;

    // 서버에서 가져오기
    const res = await customAxios.get(`users/ranks`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createUser() {
  try {
    // 서버에서 유저 생성
    const res = await customAxios.post(`users`);
  } catch (error) {
    console.error(error);
  }
}

export default { getRank, getRankList };
