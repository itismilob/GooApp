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
import { ScoreDataType, userDataType } from '@/types/dataTypes';
import HeaderButton from '@/components/HeaderButton';

import Icon from 'react-native-vector-icons/FontAwesome';
import DefaultButton from '@/components/DefaultButton';
import useCheckNetInfo from '@/hooks/useCheckNetInfo';

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
  // 로컬 기록
  const [localScore, setLocalScore] = useState<ScoreDataType[]>([]);

  const [isNetworkOn, setIsNetworkOn] = useState<boolean>(true);
  // 랭크
  const [rank, setRank] = useState<number>(0);
  const [newRank, setNewRank] = useState<number>(0);

  const localScoreFuntion = (newScoreData: ScoreDataType) => {
    // 로컬 점수 데이터 불러오기
    const scoreDataString = localStorage.getString('scoreData');
    // 저장할 배열
    const scoreData: ScoreDataType[] = [];

    // 로컬 데이터 변환
    if (scoreDataString) {
      const parsedData: ScoreDataType[] = JSON.parse(scoreDataString);
      parsedData.forEach(data => scoreData.push(data));

      // 상태 저장
      setLocalScore(scoreData);
    }

    // 변화한 데이터 저장
    const temp = JSON.stringify([...scoreData, newScoreData]);
    localStorage.set('scoreData', temp);
  };

  // 랭크 데이터를 불러옴
  const getRank = async () => {
    const userDataString = localStorage.getString('userData');
    if (!userDataString) return;

    const userData: userDataType = JSON.parse(userDataString);
    setRank(userData.rank);

    try {
      // const newRank = await axios.post()
      // newRank 더미 데이터
      const newRank = 22;
      setNewRank(newRank);

      // 새로운 랭크를 로컬에 저장
      const newUserData = { ...userData };
      newUserData.rank = newRank;
      localStorage.set('userData', JSON.stringify(newUserData));
    } catch (error) {
      console.error(error);
    }
  };

  // localScore에서 가장 높은 점수를 반환
  const getTopScore: () => number = () => {
    if (localScore) {
      const top = localScore
        .sort((a, b) => {
          return a.score - b.score;
        })
        .pop();

      console.log(localScore, top);
      if (top) return top.score;
    }
    return 0;
  };

  const getScoreIcon = () => {
    if (scoreData) {
      const top = getTopScore();
      console.log(scoreData.score, top);

      if (scoreData.score > top) {
        return <Icon name="arrow-up" color={'blue'} />;
      } else if (scoreData.score < top) {
        return <Icon name="arrow-down" color={'red'} />;
      }
    }
    return <Icon name="minus" color={'white'} />;
  };

  const getRankIcon = () => {
    if (rank < newRank) {
      return <Icon name="arrow-up" color={'blue'} />;
    } else if (rank > newRank) {
      return <Icon name="arrow-down" color={'red'} />;
    }
    return <Icon name="minus" color={'white'} />;
  };

  useEffect(() => {
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

    // 로컬 데이터
    localScoreFuntion(newScoreData);

    // 네트워크 연결 확인
    checkNetInfoTrigger();
  }, []);

  useEffect(() => {
    if (isNetworkOn) getRank();
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
          <StyledText>이전 기록 : </StyledText>
          <View className="flex-row gap-1">
            <StyledText>{getTopScore()}</StyledText>
            {getScoreIcon()}
          </View>
        </View>
        {isNetworkOn ? (
          <View className="flex-row justify-between">
            <StyledText>현재 랭킹 : </StyledText>
            <View className="flex-row gap-1">
              <StyledText>{newRank}</StyledText>
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
