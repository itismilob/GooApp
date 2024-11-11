import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Sizes } from '@/constants/Styles';
import { useEffect, useRef, useState } from 'react';

import Header from '@/components/layouts/Header';
import Title from '@/components/layouts/Title';
import SubTitle from '@/components/layouts/SubTitle';
import Contents from '@/components/layouts/Contents';
import HomeBtn from '@/components/navigation/HomeBtn';
import { FontAwesome6 } from '@expo/vector-icons';

import { GameData } from '@/constants/Types';
import { useRouter } from 'expo-router';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { setInGameAction } from '@/stores/inGameSlice';
import ThemedText from '@/components/theme/ThemedText';

export default function Game() {
  const router = useRouter();

  const [steps, setSteps] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [prevTime, setPrevTime] = useState<number>(0);
  const [thisStep, setThisStep] = useState<GameData | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const inGameData = useSelector((state: RootState) => state.inGameData);
  const dispatch = useDispatch();
  const setInGame = (gameData: GameData[]) => {
    dispatch(setInGameAction({ gameDataList: gameData }));
  };

  // Start Game
  useEffect(() => {
    createQuiz();
    setTime(0);
    setSteps(0);
    startTimer();

    return endTimer;
  }, []);

  useEffect(() => {
    createAnswers();
  }, [thisStep]);

  const createQuiz = () => {
    const gameList: GameData[] = Array.from(
      { length: inGameData.totalQuiz },
      () => {
        const quiz1 = Math.floor(Math.random() * 8) + 2;
        const quiz2 = Math.floor(Math.random() * 8) + 2;
        const correct = quiz1 * quiz2;

        return {
          quiz: [quiz1, quiz2],
          answer: 0,
          correct,
          time: 0,
        };
      }
    );

    setThisStep(gameList[0]);
    setInGame(gameList);
  };

  const createAnswers = () => {
    const correct = thisStep?.correct;
    if (!correct) return;

    const answerList = [
      correct,
      correct + (Math.floor(Math.random() * 1) + 1), // 1, 2
      correct + (Math.floor(Math.random() * 3) + 3), // 3, 4
      correct - (Math.floor(Math.random() * 1) + 1), // 1, 2
    ].sort(() => Math.random() - 0.5);

    setAnswers(answerList);
  };

  const answerClickHandler = async (answer: number) => {
    // add answer, timer data to inGameData
    const newInGameData: GameData[] = [...inGameData.gameDataList];
    const thisStepData: GameData = newInGameData[steps];
    setThisStep(thisStepData);
    setPrevTime(time);

    newInGameData[steps] = {
      ...thisStepData,
      answer,
      time: Number((time - prevTime).toFixed(2)),
    };
    setInGame(newInGameData);

    // check answer is correct
    if (thisStepData.correct === answer) {
      console.log(steps, 'correct!!');
    } else {
      console.log(steps, 'wrong!!');
      setIsWrong(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsWrong(false);
    }

    // next step
    if (steps + 1 === inGameData.totalQuiz) {
      router.replace('/pages/Scoreboard');
    } else {
      setSteps(steps + 1);
      setThisStep(inGameData.gameDataList[steps + 1]);
    }
  };

  const startTimer = () => {
    console.log('game start');
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 0.01);
    }, 10);
  };

  const endTimer = () => {
    console.log('game end');
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  return (
    <>
      <Header>
        <HomeBtn>{`x${inGameData.totalQuiz}`}</HomeBtn>
      </Header>
      <Title>
        <View style={styles.titleContainer}>
          <ThemedText style={styles.title}>
            {`${thisStep?.quiz[0].toString()}`}
          </ThemedText>
          <FontAwesome6 name='xmark' size={50} color='white' />
          <ThemedText style={styles.title}>
            {`${thisStep?.quiz[1].toString()} = ?`}
          </ThemedText>
        </View>
      </Title>
      <SubTitle>Click the answer</SubTitle>
      <Contents>
        <View style={styles.gameContents}>
          {isWrong ? (
            <View style={styles.wrong}>
              <ThemedText style={styles.wrongText}>
                {`${thisStep?.correct}`}
              </ThemedText>
            </View>
          ) : (
            <View style={styles.btnsContainer}>
              {answers.length !== 0 &&
                answers.map((answer, i) => (
                  <TouchableOpacity
                    onPress={() => {
                      answerClickHandler(answer);
                    }}
                    key={i}
                    style={styles.button}
                  >
                    <ThemedText
                      style={styles.buttonText}
                    >{`${answer}`}</ThemedText>
                  </TouchableOpacity>
                ))}
            </View>
          )}
          <View style={styles.infoContainer}>
            <ThemedText style={styles.time}>{`${time.toFixed(2)}s`}</ThemedText>
            <ThemedText style={styles.steps}>
              {`${steps + 1}/${inGameData.totalQuiz}}`}
            </ThemedText>
          </View>
        </View>
      </Contents>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: Fonts.title,
    fontWeight: 'bold',
    color: 'white',
  },
  gameContents: {
    width: '100%',
    flex: 1,
    paddingHorizontal: Sizes.defaultPadding,
  },
  btnsContainer: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  button: {
    width: '47%',
    height: '48%',
    backgroundColor: Colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.buttonRadius,
  },
  buttonText: {
    color: 'white',
    fontSize: Fonts.bigText,
    fontWeight: 'bold',
  },

  infoContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  time: {
    alignItems: 'center',
    color: 'white',
    fontSize: Fonts.bigText,
  },
  steps: {
    alignItems: 'center',
    color: 'white',
    fontSize: Fonts.default,
  },
  wrong: {
    flex: 2,
    backgroundColor: Colors.wrong,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Sizes.buttonRadius,
  },
  wrongText: {
    color: 'white',
    fontSize: Fonts.title,
    fontWeight: 'bold',
  },
});
