import Contents from '@/components/layouts/Contents';
import Header from '@/components/layouts/Header';
import SubTitle from '@/components/layouts/SubTitle';
import Title from '@/components/layouts/Title';
import HomeBtn from '@/components/navigation/HomeBtn';
import { Fonts, Colors, Sizes } from '@/constants/Styles';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { GameData } from '@/constants/Types';

const dataToList = (data: GameData, i: number) => {
  const isCorrect = data.answer === data.correct;
  return (
    <View
      key={i}
      style={[styles.quizResult, isCorrect ? styles.Correct : styles.wrong]}
    >
      <Text style={styles.quizResultText}>
        {data.quiz[0]}x{data.quiz[1]}
      </Text>
      {isCorrect ? (
        <Text style={styles.quizResultText}>{data.answer}</Text>
      ) : (
        <Text
          style={styles.quizResultText}
        >{`${data.answer} -> ${data.correct}`}</Text>
      )}
    </View>
  );
};

export default function Scoreboard() {
  const gameData = [
    { quiz: [1, 2], answer: 2, correct: 2 },
    { quiz: [1, 2], answer: 3, correct: 2 },
    { quiz: [1, 2], answer: 2, correct: 2 },
    { quiz: [1, 2], answer: 3, correct: 2 },
    { quiz: [1, 2], answer: 2, correct: 2 },
    { quiz: [1, 2], answer: 3, correct: 2 },
    { quiz: [1, 2], answer: 2, correct: 2 },
    { quiz: [1, 2], answer: 5, correct: 2 },
    { quiz: [1, 2], answer: 2, correct: 2 },
    { quiz: [1, 2], answer: 7, correct: 2 },
    { quiz: [1, 2], answer: 2, correct: 2 },
    { quiz: [1, 2], answer: 3, correct: 2 },
  ];

  return (
    <>
      <Header>
        <HomeBtn>
          <Text style={styles.headerText}>Scoreboard</Text>
        </HomeBtn>
      </Header>
      <Title>x20</Title>
      <SubTitle>29.39s</SubTitle>
      <Contents>
        <View style={styles.scoreboardContainer}>
          <Text style={styles.totalCorrect}>10/20</Text>
          <ScrollView style={styles.scrollView}>
            {gameData.length !== 0 && gameData.map(dataToList)}
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
  Correct: {
    backgroundColor: Colors.highlight,
  },
  wrong: {
    backgroundColor: Colors.wrong,
  },
  quizResultText: {
    color: 'white',
    fontSize: Fonts.default,
    fontWeight: '500',
  },
});
