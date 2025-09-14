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

import formatTag from '@/utils/formatTag';
import { showErrorAlert } from '@/utils/alert';
import userLocalStore from '@/stores/userStore';
import { useShallow } from 'zustand/react/shallow';

export default function Rank() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Rank'
  >;
  const navigation = useNavigation<NavigationProp>();

  // 유저 정보
  const [user, setUser] = userLocalStore(
    useShallow(state => [state.user, state.setUser]),
  );

  // 랭킹 리스트
  const [rankList, setRankList] = useState<UserDataType[]>([]);

  /**네트워크 확인해서 모달 띄움 */
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

  /**유저의 랭킹을 가져옴 */
  const getRank = async () => {
    try {
      const newRank = await userDataAPI.getRank(user);

      const newUser: UserDataType = { ...user, rank: newRank };
      setUser(newUser);
    } catch (error) {
      console.error(error);
    }
  };

  /**랭킹 상위 100명의 유저 정보를 가져옴 */
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
    if (user.topScore === 0) {
      return (
        <View className="absolute h-header top-0 w-full items-center justify-center gap-default">
          <TitleText size={50}>랭킹이 없습니다.</TitleText>
          <TitleText size={30}>퍼즐을 플레이 해주세요.</TitleText>
        </View>
      );
    }

    if (user.topScore > 0) {
      return (
        <View className="absolute h-header top-0 w-full items-center justify-center gap-default">
          {user != undefined && (
            <TitleText size={30}>
              {user?.nickname} {formatTag(user?.tag)}
            </TitleText>
          )}
          <TitleText size={50}>랭킹 : {user?.rank}등</TitleText>
          <TitleText size={30}>최고점수 : {user?.topScore}점</TitleText>
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
              rankList.map((rank, key) =>
                rank._id === user?._id ? (
                  <ListLiner key={key} index={key}>
                    <View className="bg-default-green border-white border-y-4 border-solid">
                      <RankListLine
                        content={[
                          key + 1,
                          `${rank.nickname} ${formatTag(rank.tag)}`,
                          `${rank.topScore}점`,
                        ]}
                      />
                    </View>
                  </ListLiner>
                ) : (
                  <ListLiner key={key} index={key}>
                    <RankListLine
                      content={[
                        key + 1,
                        `${rank.nickname} ${formatTag(rank.tag)}`,
                        `${rank.topScore}점`,
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
