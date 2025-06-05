import HeaderButton from '@/components/HeaderButton';
import RecordListLine from '@/components/RecordListLine';
import TitleText from '@/components/TitleText';
import { getLocalStorage } from '@/stores/mmkvStorage';
import { ScoreDataType } from '@/types/dataTypes';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function Record() {
  const localStorage = getLocalStorage();

  const [scores, setScores] = useState<ScoreDataType[]>([]);
  const [topScore, setTopScore] = useState<ScoreDataType>();

  const getScores = () => {
    const result = localStorage.getString('scoreData');
    if (!result) return;

    const newScore: ScoreDataType[] = JSON.parse(result);
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
    <>
      <HeaderButton>기록</HeaderButton>
      <View className="h-full bg-green-700">
        {topScore ? (
          <ScrollView className="h-full bg-green-600">
            <View className="h-60 w-full bg-green-700 items-center">
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
            <View>
              <RecordListLine
                content={{ a: '점수', b: '맞춘 개수', c: '정확도' }}
              />
              {scores.length > 0 &&
                scores.map((record, key) => (
                  <RecordListLine
                    key={key}
                    content={{
                      a: `${record.score}점`,
                      b: `${record.correct} / ${record.wrong}`,
                      c: `${record.accuracy}%`,
                    }}
                  />
                ))}
            </View>
          </ScrollView>
        ) : (
          <View className="items-center">
            <TitleText size={60}>기록이 없습니다.</TitleText>
            <TitleText size={30}>게임을 플레이 해주세요.</TitleText>
          </View>
        )}
      </View>
    </>
  );
}
