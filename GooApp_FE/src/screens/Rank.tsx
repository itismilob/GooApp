import HeaderButton from '@/components/HeaderButton';
import { View, ScrollView } from 'react-native';
import TitleText from '@/components/TitleText';
import { useState, useEffect } from 'react';
import { UserDataType } from '@/types/dataTypes';
import RankListLine from '@/components/RankListLine';

import userDataJSON from '@/test/userData.json';
import rankDataJSON from '@/test/rankData.json';

import {
  getLocalUserData,
  setLocalUserData,
} from '@/stores/localStorageFunctions';
import { getRankChanges } from '@/services/userDataAPIs';

export default function Rank() {
  // 유저 정보
  const [userData, setUserData] = useState<UserDataType | undefined>();
  // 랭킹 리스트
  const [rankList, setRankList] = useState<UserDataType[]>([]);

  // 서버에서 랭킹 정보를 가져옴
  const getRankList = async () => {
    try {
      // 서버에서 가져오기
      // const rank = await axios.get();

      // 더미 데이터 사용
      const rank: UserDataType[] = rankDataJSON;
      console.log(rank);
      if (rank) setRankList(rank);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // 유저 랭킹의 변동사항을 가져옴
    getRankChanges(newUserData => {
      setUserData(newUserData);
    });
  }, []);

  useEffect(() => {
    if (userData) getRankList();
  }, [userData]);

  return (
    <>
      <HeaderButton>랭킹</HeaderButton>
      <View className="h-full bg-green-700">
        {userData ? (
          <ScrollView className="h-full bg-green-600">
            {/* 유저 랭킹 표시 */}
            <View className="h-60 w-full bg-green-700 items-center">
              <TitleText size={30}>{userData.nickname}</TitleText>
              <TitleText size={60}>랭킹 {userData.rank}등</TitleText>
              <TitleText size={30}>최고점수 : {userData.topScore}점</TitleText>
            </View>
            {/* 랭킹 상위 100명 표시 */}
            <View>
              <RankListLine content={{ a: '랭킹', b: '사용자', c: '점수' }} />
              {rankList.length > 0 &&
                rankList.map((user, key) => (
                  <RankListLine
                    key={key}
                    content={{
                      a: user.rank.toString(),
                      b: user.nickname,
                      c: `${user.topScore}점`,
                    }}
                  />
                ))}
            </View>
          </ScrollView>
        ) : (
          <View className="items-center">
            <TitleText size={60}>사용자 정보를 불러오지 못했습니다.</TitleText>
            <TitleText size={30}>다시 시도해주세요.</TitleText>
          </View>
        )}
      </View>
    </>
  );
}
