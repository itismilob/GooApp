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

interface GameProps {
  total: number;
}
export default function Game({ total }: GameProps) {
  const router = useRouter();

  total = 5;
  const [steps, setSteps] = useState<number>(1);
  const [quiz, setQuiz] = useState<number[]>([3, 4]);
  const [answers, setAnswers] = useState<number[]>([12, 13, 14, 11]);
  const [correct, setCorrect] = useState<number>(0);
  const [gameData, setGameData] = useState<GameData[]>([]);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start Game
  useEffect(() => {
    resetGame();
    createQuiz();
    return endTimer;
  }, []);

  const resetGame = () => {
    setTime(0);
    setSteps(1);
    startTimer();
  };

  const createQuiz = () => {
    const quiz1 = Math.floor(Math.random() * 8) + 2;
    const quiz2 = Math.floor(Math.random() * 8) + 2;
    const correctOne = quiz1 * quiz2;
    const answerList = [
      correctOne,
      correctOne + (Math.floor(Math.random() * 1) + 1), // 1, 2
      correctOne + (Math.floor(Math.random() * 3) + 3), // 3, 4
      correctOne - (Math.floor(Math.random() * 1) + 1), // 1, 2
    ].sort(() => Math.random() - 0.5);

    setQuiz([quiz1, quiz2]);
    setCorrect(correctOne);
    setAnswers(answerList);
  };

  const answerClickHandler = async (answer: number) => {
    setGameData((prev) => [
      ...prev,
      {
        quiz,
        answer,
        correct,
      },
    ]);

    if (correct === answer) {
      console.log(steps, 'correct!!');
    } else {
      console.log(steps, 'wrong!!');
      setIsWrong(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsWrong(false);
    }

    if (steps === total) {
      console.log('end!!');
      endTimer();
      router.replace('/pages/Scoreboard');
    } else {
      setSteps(steps + 1);
      createQuiz();
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

    // console.log(JSON.stringify(gameData, null, 2));
  };

  return (
    <>
      <Header>
        <HomeBtn>{`x${total}`}</HomeBtn>
      </Header>
      <Title>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{quiz[0].toString()}</Text>
          <FontAwesome6 name='xmark' size={50} color='white' />
          <Text style={styles.title}>{quiz[1].toString()} = ?</Text>
        </View>
      </Title>
      <SubTitle>Click the answer</SubTitle>
      <Contents>
        <View style={styles.gameContents}>
          {isWrong ? (
            <View style={styles.wrong}>
              <Text style={styles.wrongText}>{correct}</Text>
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
                    <Text style={styles.buttonText}>{answer}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
          <View style={styles.infoContainer}>
            <Text style={styles.time}>{time.toFixed(2)}s</Text>
            <Text style={styles.steps}>
              {steps}/{total}
            </Text>
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
