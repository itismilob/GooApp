import { UserDataType } from '@/types/dataTypes';
import axios from 'axios';

/**
 * 서버에 유저 최고점수 전송 -> 현재 rank 반환
 * @param userData
 * @param score
 * @returns newRank : number
 */
export async function getRank(userData: UserDataType, score: number) {
  // 더미 - 현재 로컬 유저 데이터 사용
  // const newUserData = localUserData;

  const { SERVER_URI } = process.env;

  // 서버에 전송
  const res = await axios.put(`${SERVER_URI}/users/score`, {
    userID: userData._id,
    score: score,
  });
  return res.data.rank;
}

// 서버에서 랭킹 정보를 가져옴

/**
 * 서버에서 랭킹 리스트 가져옴
 * @returns UserData List
 */
export async function getRankList() {
  const { SERVER_URI } = process.env;
  // 서버에서 가져오기
  const res = await axios.get(`${SERVER_URI}/users/ranks`);

  // 더미 데이터 사용
  // const rank: UserDataType[] = rankDataJSON;

  return res.data;
}

export default { getRank, getRankList };
