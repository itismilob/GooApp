import DefaultButton from '@/components/DefaultButton';
import HeaderButton from '@/components/HeaderButton';
import RecordListLine from '@/components/RecordListLine';
import TitleText from '@/components/TitleText';
import { getLocalScoreData } from '@/stores/localStorageFunctions';
import { getLocalStorage } from '@/stores/mmkvStorage';
import { ScoreDataType } from '@/types/dataTypes';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import ListLiner from '@/components/ListLiner';
import Line from '@/components/Line';

export default function Record() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Record'
  >;
  const navigation = useNavigation<NavigationProp>();

  const [scores, setScores] = useState<ScoreDataType[]>([]);
  const [topScore, setTopScore] = useState<ScoreDataType>();

  const getScores = () => {
    const newScore = getLocalScoreData();
    if (!newScore) return;

    setScores(newScore);

    const newTop = newScore.reduce((prev, curr) => {
      return curr.score > prev.score ? curr : prev;
    });
    setTopScore(newTop);
  };

  useEffect(() => {
    getScores();
  }, []);

  return (
    <View className="flex-1 bg-default-green">
      <HeaderButton>기록</HeaderButton>
      <View className="flex-1">
        {topScore ? (
          <>
            {/* 최고기록 표시 */}
            <View className="absolute h-header top-0 w-full items-center justify-center gap-default">
              <TitleText size={30}>최고기록</TitleText>
              <TitleText size={60}>{topScore?.score}점</TitleText>
              <View className="flex-row justify-between w-60">
                <View>
                  <TitleText size={30}>
                    {topScore?.correct} / {topScore?.wrong}
                  </TitleText>
                </View>
                <TitleText size={30}>{topScore?.accuracy}%</TitleText>
              </View>
            </View>
            <ScrollView className="w-full">
              {/* 기록 리스트 표시 */}
              <View className="mt-header min-h-screen bg-light-green rounded-default">
                <RecordListLine content={['점수', '맞춘 개수', '정확도']} />
                {scores.length > 0 &&
                  scores.map((record, key) => (
                    <ListLiner key={key} index={key}>
                      <RecordListLine
                        content={[
                          `${record.score}점`,
                          `${record.correct} / ${record.wrong}`,
                          `${record.accuracy}%`,
                        ]}
                      />
                    </ListLiner>
                  ))}
              </View>
            </ScrollView>
          </>
        ) : (
          <View className="p-default flex-1">
            <View className="items-center justify-center flex-1 gap-default">
              <TitleText size={50}>기록이 없습니다.</TitleText>
              <TitleText size={30}>퍼즐을 플레이 해주세요.</TitleText>
            </View>
            <DefaultButton
              color="green"
              onPress={() => {
                navigation.replace('Puzzle');
              }}
            >
              퍼즐 플레이
            </DefaultButton>
          </View>
        )}
      </View>
    </View>
  );
}
