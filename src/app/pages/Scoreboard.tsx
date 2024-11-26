import Contents from '@/components/layouts/Contents';
import Header from '@/components/layouts/Header';
import SubTitle from '@/components/layouts/SubTitle';
import Title from '@/components/layouts/Title';
import HomeBtn from '@/components/navigation/HomeBtn';
import { Fonts, Colors, Sizes } from '@/constants/Styles';
import { ScrollView, StyleSheet, View } from 'react-native';
import ThemedText from '@/components/theme/ThemedText';
import Entypo from '@expo/vector-icons/Entypo';

import { GameData, STATUS_KEY, StatusData } from '@/constants/Types';
import { RootState } from '@/stores/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

const dataToList = (data: GameData, i: number) => {
  const isCorrect = data.answer === data.correct;
  return (
    <View
      key={i}
      style={[styles.quizResult, isCorrect ? styles.correct : styles.wrong]}
    >
      <ThemedText bold style={styles.quizResultText}>
        {`${data.quiz[0]}x${data.quiz[1]}`}
      </ThemedText>
      {isCorrect ? (
        <ThemedText
          bold
          style={styles.quizResultText}
        >{`${data.answer}`}</ThemedText>
      ) : (
        <View style={styles.quizWrong}>
          <ThemedText
            bold
            style={styles.quizResultText}
          >{`${data.answer}`}</ThemedText>
          <Entypo name='arrow-right' size={20} color='white' />
          <ThemedText
            bold
            style={styles.quizResultText}
          >{`${data.correct}`}</ThemedText>
        </View>
      )}
      <ThemedText style={styles.quizResultText}>
        {`${data.time.toFixed(2)}s`}
      </ThemedText>
    </View>
  );
};

export default function Scoreboard() {
  const inGameData = useSelector((state: RootState) => state.inGameData);
  const userData = useSelector((state: RootState) => state.userData);

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

  const saveToStorage = async () => {
    try {
      // get prevStatus
      const json = await AsyncStorage.getItem(STATUS_KEY);
      let prevStatus: StatusData = {};
      if (json) {
        prevStatus = await JSON.parse(json);
      }

      // convert prevStatus to new
      inGameData.gameDataList.forEach((gameData: GameData) => {
        if (gameData.correct !== gameData.answer) return;
        const quiz = `${gameData.quiz[0]}x${gameData.quiz[1]}`;

        if (prevStatus[quiz]) {
          const prevData = prevStatus[quiz];
          const mean =
            (prevData.mean * prevData.count + gameData.time) /
            (prevData.count + 1);
          const count = prevData.count + 1;

          prevStatus[quiz] = { mean: Number(mean.toFixed(2)), count };
        } else {
          prevStatus[quiz] = { mean: gameData.time, count: 1 };
        }
      });

      // save newStatus
      await AsyncStorage.setItem(STATUS_KEY, JSON.stringify(prevStatus));
    } catch (error) {
      console.log('AsyncStorage Error', error);
    }
  };

  const saveToServer = async () => {
    try {
      await fetch(`${SERVER_URL}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gametype: inGameData.totalQuiz,
          username: userData.username,
          mean: totalTime,
        }),
      });
    } catch (error) {
      console.log('saveToServer Error', error);
    }
  };

  useEffect(() => {
    saveToStorage();
    saveToServer();
  }, []);

  return (
    <>
      <Header>
        <HomeBtn>
          <ThemedText bold style={styles.headerText}>
            Scoreboard
          </ThemedText>
        </HomeBtn>
      </Header>
      <Title>{`x${inGameData.totalQuiz}s`}</Title>
      <SubTitle>{`${totalTime.toFixed(2)}s`}</SubTitle>
      <Contents>
        <View style={styles.scoreboardContainer}>
          <ThemedText bold style={styles.totalCorrect}>
            {`${correctCount}/${inGameData.totalQuiz}`}
          </ThemedText>
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
  },
  scoreboardContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
    // paddingVertical: 30,
    borderRadius: 30,
    overflow: 'hidden',
    paddingHorizontal: Sizes.defaultPadding,
  },
  totalCorrect: {
    color: 'white',
    fontSize: Fonts.default,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  scrollView: {
    // backgroundColor: 'red',
    borderRadius: 30,
  },
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
  },
});
