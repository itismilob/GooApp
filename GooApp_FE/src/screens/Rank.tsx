import HeaderButton from '@/components/HeaderButton';
import { View, ScrollView } from 'react-native';
import TitleText from '@/components/TitleText';
import { useState, useEffect } from 'react';
import { UserDataType } from '@/types/dataTypes';
import rankDataJSON from '@/test/rankData.json';

import { getRankChanges } from '@/services/userDataAPIs';
import RankListLine from '@/components/RankListLine';
import RecordListLine from '@/components/RecordListLine';

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
    <View className="flex-1 bg-default-green">
      <HeaderButton>랭킹</HeaderButton>
      <View className="flex-1">
        {userData ? (
          <>
            {/* 유저 랭킹 표시 */}
            <View className="absolute h-header top-0 w-full items-center justify-center gap-default">
              <TitleText size={30}>{userData.nickname}</TitleText>
              <TitleText size={50}>랭킹 {userData.rank}등</TitleText>
              <TitleText size={30}>최고점수 : {userData.topScore}점</TitleText>
            </View>
            <ScrollView className="w-full">
              {/* 랭킹 상위 100명 표시 */}
              <View className="mt-[400] h-full bg-light-green rounded-default px-default">
                <RecordListLine content={['랭킹', '사용자', '점수']} />
                {rankList.length > 0 &&
                  rankList.map((user, key) => (
                    <RankListLine
                      key={key}
                      content={[
                        user.rank.toString(),
                        user.nickname,
                        `${user.topScore}점`,
                      ]}
                    />
                  ))}
              </View>
            </ScrollView>
          </>
        ) : (
          <View className="items-center">
            <TitleText size={50}>사용자 정보를 불러오지 못했습니다.</TitleText>
            <TitleText size={30}>다시 시도해주세요.</TitleText>
          </View>
        )}
      </View>
    </View>
  );
}
