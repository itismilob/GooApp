import HeaderButton from '@/components/HeaderButton';
import { View, ScrollView } from 'react-native';
import TitleText from '@/components/TitleText';
import { useState, useEffect } from 'react';
import { UserDataType } from '@/types/dataTypes';
import rankDataJSON from '@/test/rankData.json';

import { getRankChanges } from '@/services/userDataAPIs';
import RankListLine from '@/components/RankListLine';
import RecordListLine from '@/components/RecordListLine';
import useCheckNetInfo from '@/hooks/useCheckNetInfo';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import ListLiner from '@/components/ListLiner';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Rank() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Rank'
  >;
  const navigation = useNavigation<NavigationProp>();

  // 네트워크 확인
  const [isNetwork, setIsNetwork] = useState<boolean>(false);
  // 유저 정보
  const [userData, setUserData] = useState<UserDataType | undefined>();
  // 랭킹 리스트
  const [rankList, setRankList] = useState<UserDataType[]>([]);

  // 네트워크 확인해서 모달 띄움
  const checkNetInfoTrigger = useCheckNetInfo(
    () => {
      setIsNetwork(true);
    },
    () => {
      navigation.navigate('NetworkOfflineModal');
    },
  );

  // 서버에서 랭킹 정보를 가져옴
  const getRankList = async () => {
    try {
      // 서버에서 가져오기
      // const rank = await axios.get();

      // 더미 데이터 사용
      const rank: UserDataType[] = rankDataJSON;

      if (rank) setRankList(rank);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkNetInfoTrigger();
  }, []);

  useEffect(() => {
    if (isNetwork) {
      // 유저 랭킹의 변동사항을 가져옴
      getRankChanges(newUserData => {
        setUserData(newUserData);
      });
    }
  }, [isNetwork]);

  useEffect(() => {
    if (userData) getRankList();
  }, [userData]);

  return (
    <SafeAreaView className="flex-1 bg-default-green">
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
              <View className="mt-header min-h-screen bg-light-green rounded-default ">
                <RecordListLine content={['랭킹', '사용자', '점수']} />
                {rankList.length > 0 &&
                  rankList.map((user, key) =>
                    user.userID === userData.userID ? (
                      <ListLiner key={key} index={key}>
                        <View className="bg-default-green border-white border-y-4 border-solid">
                          <RankListLine
                            content={[
                              user.rank,
                              user.nickname,
                              `${user.topScore}점`,
                            ]}
                          />
                        </View>
                      </ListLiner>
                    ) : (
                      <ListLiner key={key} index={key}>
                        <RankListLine
                          content={[
                            user.rank,
                            user.nickname,
                            `${user.topScore}점`,
                          ]}
                        />
                      </ListLiner>
                    ),
                  )}
              </View>
            </ScrollView>
          </>
        ) : (
          <View className="gap-default justify-center items-center flex-1">
            <TitleText size={50} className="text-center">
              {'사용자 정보를\n불러오지 못했습니다.'}
            </TitleText>
            <TitleText size={30}>다시 시도해주세요.</TitleText>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
