import HeaderButton from '@/components/HeaderButton';
import { View, ScrollView, Alert } from 'react-native';
import TitleText from '@/components/TitleText';
import { useState, useEffect } from 'react';
import { UserDataType } from '@/types/dataTypes';
import rankDataJSON from '@/test/rankData.json';

import userDataAPI from '@/services/userDataAPI';
import RankListLine from '@/components/RankListLine';
import RecordListLine from '@/components/RecordListLine';
import useCheckNetInfo from '@/hooks/useCheckNetInfo';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import ListLiner from '@/components/ListLiner';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  getLocalUserData,
  setLocalUserData,
} from '@/stores/localStorageFunctions';
import formatTag from '@/utils/formatTag';
import { showErrorAlert } from '@/utils/alert';

export default function Rank() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Rank'
  >;
  const navigation = useNavigation<NavigationProp>();

  // 유저 정보
  const [userData, setUserData] = useState<UserDataType | undefined>();
  // 랭킹 리스트
  const [rankList, setRankList] = useState<UserDataType[]>([]);

  // 네트워크 확인해서 모달 띄움
  const checkNetInfoTrigger = useCheckNetInfo(
    () => {
      // 유저 랭킹의 변동사항을 가져옴
      getRank();
      getRankList();
    },
    () => {
      navigation.navigate('NetworkOfflineModal');
    },
  );

  const getRank = async () => {
    const localUser = getLocalUserData();
    if (!localUser) return;

    try {
      const newRank = await userDataAPI.getRank(localUser);

      const newUser: UserDataType = { ...localUser, rank: newRank };
      setLocalUserData(newUser);
      setUserData(newUser);
    } catch (error) {
      console.error(error);
    }
  };

  const getRankList = async () => {
    try {
      const ranks = await userDataAPI.getRankList();
      setRankList(ranks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkNetInfoTrigger();
  }, []);

  const headerRender = () => {
    if (!userData) return;
    if (userData.topScore === 0) {
      return (
        <View className="absolute h-header top-0 w-full items-center justify-center gap-default">
          <TitleText size={50}>랭킹이 없습니다.</TitleText>
          <TitleText size={30}>퍼즐을 플레이 해주세요.</TitleText>
        </View>
      );
    }

    if (userData.topScore > 0) {
      return (
        <View className="absolute h-header top-0 w-full items-center justify-center gap-default">
          {userData != undefined && (
            <TitleText size={30}>
              {userData?.nickname} {formatTag(userData?.tag)}
            </TitleText>
          )}
          <TitleText size={50}>랭킹 : {userData?.rank}등</TitleText>
          <TitleText size={30}>최고점수 : {userData?.topScore}점</TitleText>
        </View>
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-default-green">
      <HeaderButton>랭킹</HeaderButton>
      <View className="flex-1">
        {headerRender()}
        <ScrollView className="w-full">
          {/* 랭킹 상위 100명 표시 */}
          <View className="mt-header min-h-screen bg-light-green rounded-default ">
            <RecordListLine content={['랭킹', '사용자', '점수']} />
            {Array.isArray(rankList) &&
              rankList.length > 0 &&
              rankList.map((user, key) =>
                user._id === userData?._id ? (
                  <ListLiner key={key} index={key}>
                    <View className="bg-default-green border-white border-y-4 border-solid">
                      <RankListLine
                        content={[
                          key + 1,
                          `${user.nickname} ${formatTag(user.tag)}`,
                          `${user.topScore}점`,
                        ]}
                      />
                    </View>
                  </ListLiner>
                ) : (
                  <ListLiner key={key} index={key}>
                    <RankListLine
                      content={[
                        key + 1,
                        `${user.nickname} ${formatTag(user.tag)}`,
                        `${user.topScore}점`,
                      ]}
                    />
                  </ListLiner>
                ),
              )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
