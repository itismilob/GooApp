import {
  getLocalUserData,
  setLocalUserData,
} from '@/stores/localStorageFunctions';
import { UserDataType } from '@/types/dataTypes';

type getRankChangesProp = (userData: UserDataType) => void;

// 서버에 전송 -> 새로운 데이터 응답 (rank만 변화함)
export async function getRankChanges(useUserData: getRankChangesProp) {
  // 로컬 유저 데이터 가져옴

  const localUserData = getLocalUserData();
  if (!localUserData) return;

  try {
    // 더미 - 현재 로컬 유저 데이터 사용
    const newUserData = localUserData;

    // 서버에 전송
    // const newUserData = await axios.post(localUser);

    if (!newUserData) return;

    newUserData.rank = 22;
    useUserData(newUserData);

    setLocalUserData(newUserData);
  } catch (error) {
    console.error(error);
  }
}
