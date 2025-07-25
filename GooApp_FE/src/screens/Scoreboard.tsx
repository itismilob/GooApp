import { Pressable, View, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import puzzleStore from '@/stores/puzzleStore';
import { useEffect, useState } from 'react';
import TitleText from '@/components/TitleText';
import { getAccuracy } from '@/utils/getAccuracy';
import StyledText from '@/components/StyledText';
import { LocalStorage } from '@/stores/mmkvStorage';
import { ScoreDataType, UserDataType } from '@/types/dataTypes';
import HeaderButton from '@/components/HeaderButton';

import Icon from 'react-native-vector-icons/FontAwesome';
import DefaultButton from '@/components/DefaultButton';
import useCheckNetInfo from '@/hooks/useCheckNetInfo';
import {
  getLocalUserData,
  setLocalUserData,
} from '@/stores/localStorageFunctions';
import userDataAPI from '@/services/userDataAPI';
import Line from '@/components/Line';

import { SafeAreaView } from 'react-native-safe-area-context';
import { showErrorAlert } from '@/utils/alert';

// 랭킹 상승 : -1, 유지 : 0, 하락 : 1
type RankChangeType = -1 | 0 | 1;

export default function Scoreboard() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Scoreboard'
  >;
  const navigation = useNavigation<NavigationProp>();

  // 퍼즐 게임 데이터 스토어
  const puzzleStoreState = puzzleStore.getState();
  // 현재 게임 점수
  const [scoreData, setScoreData] = useState<ScoreDataType | null>(null);
  // 최고 기록
  const [topScore, setTopScore] = useState<number>(0);
  // 네트워크 연결 유무
  const [isNetworkOn, setIsNetworkOn] = useState<boolean>(true);
  // 기록 변경사항
  const [recordChangeState, setRecordChangeState] = useState<RankChangeType>(0);
  // 랭킹 변경사항
  const [rankChangeState, setRankChangeState] = useState<RankChangeType>(0);
  // 유저 데이터
  const [userData, setUserData] = useState<UserDataType | undefined>();

  /**
   * 새로운 점수 데이터 생성
   */
  const createNewScoreData = () => {
    const stats = puzzleStoreState.getAnswerStats();
    const accuracy = getAccuracy(stats[0], stats[1]);
    const score = stats[0] * accuracy;

    // 새로운 데이터 생성
    const newScoreData: ScoreDataType = {
      correct: stats[0],
      wrong: stats[1],
      accuracy,
      score,
      timestamp: new Date(),
    };

    setScoreData(newScoreData);
  };

  // 새 점수 로컬 저장 -> 파일 분할하기 zustand + mmkv
  const addLocalScoreData = () => {
    // 로컬 점수 데이터 불러오기
    const scoreDataString = LocalStorage.getString('scoreData');
    let newScoreData: string;

    // 로컬 데이터에 점수 추가
    if (scoreDataString) {
      const result: ScoreDataType[] = JSON.parse(scoreDataString);

      // 데이터 추가해서 저장
      newScoreData = JSON.stringify([...result, scoreData]);
    } else {
      newScoreData = JSON.stringify([scoreData]);
    }

    localStorage.set('scoreData', newScoreData);
  };

  // 최고기록 비교, 변경
  const compareTopScore = () => {
    // userData 무조건 존재함
    if (!userData || !scoreData) return;

    const score = scoreData.score;

    if (score > userData.topScore) {
      // 최고기록 경신
      setRecordChangeState(-1);
      setTopScore(score);
    } else if (score < userData.topScore) {
      // 최고기록보다 낮은 점수
      setRecordChangeState(1);
      setTopScore(userData.topScore);
    } else {
      // 최고기록과 동일한 점수
      setRecordChangeState(0);
      setTopScore(userData.topScore);
    }
  };

  // 점수 변동 아이콘 정함
  const getScoreIcon = () => {
    if (recordChangeState === -1) {
      return <Icon name="arrow-up" size={25} color={'blue'} />;
    } else if (recordChangeState === 1) {
      return <Icon name="arrow-down" size={25} color={'red'} />;
    }

    return <Icon name="minus" size={25} color={'white'} />;
  };

  // 랭킹 변동 아이콘 정함
  const getRankIcon = () => {
    if (rankChangeState === -1) {
      return <Icon name="arrow-up" size={25} color={'blue'} />;
    } else if (rankChangeState === 1) {
      return <Icon name="arrow-down" size={25} color={'red'} />;
    }
    return <Icon name="minus" size={25} color={'white'} />;
  };

  const getRankChanges = async () => {
    // userData, scoreData 무조건 존재
    if (!userData) return;

    try {
      // API 연결
      const newRank = await userDataAPI.getRank(userData);

      // 랭킹 변동사항 적용
      if (userData.rank > newRank || userData.rank === 0) {
        // 랭킹 상승
        setRankChangeState(-1);
      } else if (userData.rank < newRank) {
        // 랭킹 하락
        setRankChangeState(1);
      } else {
        // 랭킹 유지
        setRankChangeState(0);
      }

      // 랭킹 갱신
      setLocalUserData({ ...userData, rank: newRank });
      setUserData({ ...userData, rank: newRank });
    } catch (error) {
      console.error(error);
    }
  };

  const checkNetInfoTrigger = useCheckNetInfo(() => {
    getRankChanges();
    setIsNetworkOn(true);
  }, undefined);

  // 점수 생성 + 로컬 정보 로딩
  useEffect(() => {
    // 새로운 점수 데이터 생성
    createNewScoreData();

    // 유저 데이터 가져옴
    const localUserData = getLocalUserData();
    setUserData(localUserData);
  }, []);

  useEffect(() => {}, [scoreData]);

  // 새 점수 저장 + 최고 점수 비교
  useEffect(() => {
    if (userData && scoreData && !topScore) {
      // 새 점수 로컬 저장
      addLocalScoreData();
      // topScore 비교, 변경
      compareTopScore();
    }
  }, [userData, scoreData]);

  // 최고기록 저장 + 네트워크 확인
  useEffect(() => {
    if (topScore) {
      // 최고기록 저장
      const newUserData = { ...userData!, topScore };
      // zustand + mmkv
      setLocalUserData(newUserData);
      setUserData(newUserData);

      // 네트워크 연결 확인
      checkNetInfoTrigger();
    }
  }, [topScore]);

  return (
    <SafeAreaView className="flex-1 bg-default-green">
      <HeaderButton>점수판</HeaderButton>

      <View className="p-default flex-1">
        <View className="flex-1 justify-center items-center gap-default ">
          <View className="w-full items-center  gap-default">
            <TitleText size={60}>{`${scoreData?.score}점`}</TitleText>
            <View className="flex-row justify-center gap-10 w-full">
              <TitleText
                size={30}
              >{`${scoreData?.correct} / ${scoreData?.wrong}`}</TitleText>
              <TitleText size={30}>{`${scoreData?.accuracy}%`}</TitleText>
            </View>
          </View>

          <View className="w-full p-default gap-[50]">
            <Line color="light" />
            <View className="flex-row justify-between px-5">
              <TitleText size={30}>최고 기록 : </TitleText>
              <View className="flex-row gap-5 items-center">
                <TitleText size={30}>{topScore}</TitleText>
                {getScoreIcon()}
              </View>
            </View>
            {isNetworkOn ? (
              <View className="flex-row justify-between px-5">
                <TitleText size={30}>현재 랭킹 : </TitleText>
                <View className="flex-row gap-5 items-center">
                  <TitleText size={30}>{userData?.rank}</TitleText>
                  {getRankIcon()}
                </View>
              </View>
            ) : (
              <StyledText>네트워크 연결 필요</StyledText>
            )}
            <Line color="light" />
          </View>
        </View>
        <DefaultButton
          color="green"
          onPress={() => {
            navigation.navigate('Puzzle');
          }}
        >
          다시하기
        </DefaultButton>
      </View>
    </SafeAreaView>
  );
}
