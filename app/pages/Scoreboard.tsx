import Contents from '@/components/layouts/Contents';
import Header from '@/components/layouts/Header';
import SubTitle from '@/components/layouts/SubTitle';
import Title from '@/components/layouts/Title';
import HomeBtn from '@/components/navigation/HomeBtn';
import { Fonts, Colors, Sizes } from '@/constants/Styles';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import { GameData } from '@/constants/Types';
import { RootState } from '@/stores/store';
import { useSelector } from 'react-redux';

const dataToList = (data: GameData, i: number) => {
  const isCorrect = data.answer === data.correct;
  return (
    <View
      key={i}
      style={[styles.quizResult, isCorrect ? styles.correct : styles.wrong]}
    >
      <Text style={styles.quizResultText}>
        {data.quiz[0]}x{data.quiz[1]}
      </Text>
      {isCorrect ? (
        <Text style={styles.quizResultText}>{data.answer}</Text>
      ) : (
        <View style={styles.quizWrong}>
          <Text style={styles.quizResultText}>{data.answer}</Text>
          <Entypo name='arrow-right' size={20} color='white' />
          <Text style={styles.quizResultText}>{data.correct}</Text>
        </View>
      )}
      <Text style={styles.quizResultText}>{data.time.toFixed(2)}s</Text>
    </View>
  );
};

export default function Scoreboard() {
  const inGameData = useSelector((state: RootState) => state.inGameData);
  const correctCount = inGameData.gameDataList.reduce((count, data) => {
    if (data.correct === data.answer) {
      count++;
    }
    return count;
  }, 0);

  const totalTime = inGameData.gameDataList.reduce((duration, data) => {
    duration += data.time;
    return duration;
  }, 0);

  return (
    <>
      <Header>
        <HomeBtn>
          <Text style={styles.headerText}>Scoreboard</Text>
        </HomeBtn>
      </Header>
      <Title>{`x${inGameData.totalQuiz}s`}</Title>
      <SubTitle>{`${totalTime}s`}</SubTitle>
      <Contents>
        <View style={styles.scoreboardContainer}>
          <Text style={styles.totalCorrect}>
            {correctCount}/{inGameData.totalQuiz}
          </Text>
          <ScrollView style={styles.scrollView}>
            {inGameData.gameDataList.length !== 0 &&
              inGameData.gameDataList.map(dataToList)}
          </ScrollView>
        </View>
      </Contents>
    </>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: 'white',
    fontSize: Fonts.subTitle,
    fontWeight: 'bold',
  },
  scoreboardContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
    // paddingVertical: 30,
    borderRadius: 30,
    overflow: 'hidden',
  },
  totalCorrect: {
    color: 'white',
    fontSize: Fonts.default,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  scrollView: {},
  quizResult: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 6,
  },
  correct: {
    backgroundColor: Colors.highlight,
  },
  wrong: {
    backgroundColor: Colors.wrong,
  },
  quizWrong: { flexDirection: 'row', gap: 5, alignItems: 'center' },
  quizResultText: {
    color: 'white',
    fontSize: Fonts.default,
    fontWeight: '500',
  },
});
