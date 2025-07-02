import {
  getLocalUserData,
  setLocalUserData,
} from '@/stores/localStorageFunctions';
import { UserDataType } from '@/types/dataTypes';
import axios from 'axios';

type getRankChangesProp = (userData: UserDataType) => void;

// 서버에 전송 -> 새로운 데이터 응답 (rank만 변화함)
/**
 *
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
