import { Pressable, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import puzzleStore from '@/stores/puzzleStore';
import { useEffect, useState } from 'react';
import TitleText from '@/components/TitleText';
import { getAccuracy } from '@/utils/getAccuracy';
import StyledText from '@/components/StyledText';
import { getLocalStorage } from '@/stores/mmkvStorage';
import { ScoreDataType, UserDataType } from '@/types/dataTypes';
import HeaderButton from '@/components/HeaderButton';

import Icon from 'react-native-vector-icons/FontAwesome';
import DefaultButton from '@/components/DefaultButton';
import useCheckNetInfo from '@/hooks/useCheckNetInfo';
import {
  getLocalUserData,
  setLocalUserData,
} from '@/stores/localStorageFunctions';
import { getRankChanges } from '@/services/userDataAPIs';

// 랭크 상승 : -1, 유지 : 0, 하락 : 1
type RankChangeType = -1 | 0 | 1;

export default function Scoreboard() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Scoreboard'
  >;
  const navigation = useNavigation<NavigationProp>();
  const localStorage = getLocalStorage();
  const checkNetInfoTrigger = useCheckNetInfo(() => {
    setIsNetworkOn(true);
  }, undefined);

  // 퍼즐 게임 데이터 스토어
  const puzzleStoreState = puzzleStore.getState();
  // 현재 게임 점수
  const [scoreData, setScoreData] = useState<ScoreDataType | null>(null);
  // 최고 기록
  const [topScore, setTopScore] = useState<number>(0);
  // 네트워크 연결 유무
  const [isNetworkOn, setIsNetworkOn] = useState<boolean>(true);
  // 랭크
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

  // 새 점수 로컬 저장
  const addLocalScoreData = () => {
    // 로컬 점수 데이터 불러오기
    const scoreDataString = localStorage.getString('scoreData');
    let newScoreData: string;

    // 로컬 데이터에 점수 추가
    if (scoreDataString) {
      const result: ScoreDataType[] = JSON.parse(scoreDataString);

      // 데이터 추가해서 저장
      newScoreData = JSON.stringify([...result, scoreData]);
    } else {
      newScoreData = JSON.stringify([scoreData]);
    }
    console.log(newScoreData);
    localStorage.set('scoreData', newScoreData);
  };

  // 최고기록 비교, 변경
  const compareTopScore = () => {
    const localUser = getLocalUserData();
    if (!localUser) return;

    if (scoreData!.score > localUser.topScore) {
      // 최고기록 경신
      const newUserData = { ...localUser, topScore: scoreData!.score };
      setLocalUserData(newUserData);
      setTopScore(scoreData!.score);
    } else {
      // 최고기록 변경 X
      setTopScore(localUser.topScore);
    }
  };

  // 점수 변동 아이콘 정함
  const getScoreIcon = () => {
    if (scoreData) {
      if (scoreData.score > topScore) {
        return <Icon name="arrow-up" color={'blue'} />;
      } else if (scoreData.score < topScore) {
        return <Icon name="arrow-down" color={'red'} />;
      }
    }
    return <Icon name="minus" color={'white'} />;
  };

  // 랭킹 변동 아이콘 정함
  const getRankIcon = () => {
    if (rankChangeState === -1) {
      return <Icon name="arrow-up" color={'blue'} />;
    } else if (rankChangeState === 1) {
      return <Icon name="arrow-down" color={'red'} />;
    }
    return <Icon name="minus" color={'white'} />;
  };

  useEffect(() => {
    // 새로운 점수 데이터 생성
    createNewScoreData();

    // 유저 데이터 가져옴
    const localUserData = getLocalUserData();
    setUserData(localUserData);
  }, []);

  useEffect(() => {
    if (scoreData) {
      // 새 점수 로컬 저장
      addLocalScoreData();
      // topScore 비교, 변경
      compareTopScore();
      // 네트워크 연결 확인
      checkNetInfoTrigger();
    }
  }, [scoreData]);

  useEffect(() => {
    if (isNetworkOn) {
      const userData = getLocalUserData();
      if (!userData) return;

      getRankChanges(newUserData => {
        setUserData(newUserData);

        // 랭크 변동사항 적용
        if (userData.rank > newUserData.rank) {
          // 랭크 상승
          setRankChangeState(-1);
        } else if (userData.rank < newUserData.rank) {
          // 랭크 하락
          setRankChangeState(1);
        }
      });
    }
  }, [isNetworkOn]);

  return (
    <View className="w-full h-full justify-center items-center bg-green-500">
      <HeaderButton>점수판</HeaderButton>
      <View className="w-full items-center">
        <TitleText size={60}>{`${scoreData?.score}점`}</TitleText>
        <View className="flex-row justify-center gap-10 w-full">
          <TitleText
            size={30}
          >{`${scoreData?.correct} / ${scoreData?.wrong}`}</TitleText>
          <TitleText size={30}>{`${scoreData?.accuracy}%`}</TitleText>
        </View>
      </View>

      <View className="w-60">
        <View className="flex-row justify-between">
          <StyledText>최고 기록 : </StyledText>
          <View className="flex-row gap-1">
            <StyledText>{topScore}</StyledText>
            {getScoreIcon()}
          </View>
        </View>
        {isNetworkOn ? (
          <View className="flex-row justify-between">
            <StyledText>현재 랭킹 : </StyledText>
            <View className="flex-row gap-1">
              <StyledText>{userData?.rank}</StyledText>
              {getRankIcon()}
            </View>
          </View>
        ) : (
          <StyledText>네트워크 연결 필요</StyledText>
        )}
      </View>

      <DefaultButton
        onPress={() => {
          navigation.navigate('Puzzle');
        }}
      >
        <TitleText size={30}>다시하기</TitleText>
      </DefaultButton>
    </View>
  );
}
