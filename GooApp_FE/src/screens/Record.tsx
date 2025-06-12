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
            <ScrollView className="w-full ">
              {/* 기록 리스트 표시 */}
              <View className="mt-[400] h-full bg-light-green rounded-default px-default">
                <RecordListLine content={['점수', '맞춘 개수', '정확도']} />
                {scores.length > 0 &&
                  scores.map((record, key) => (
                    <RecordListLine
                      key={key}
                      content={[
                        `${record.score}점`,
                        `${record.correct} / ${record.wrong}`,
                        `${record.accuracy}%`,
                      ]}
                    />
                  ))}
              </View>
            </ScrollView>
          </>
        ) : (
          <View className="items-center">
            <TitleText size={50}>기록이 없습니다.</TitleText>
            <TitleText size={30}>게임을 플레이 해주세요.</TitleText>
          </View>
        )}
      </View>
    </View>
  );
}
