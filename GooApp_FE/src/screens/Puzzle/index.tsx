import { View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import HeaderButton from '@/components/HeaderButton';
import TitleText from '@/components/TitleText';
import DefaultButton from '@/components/DefaultButton';

import { useEffect, useRef, useState } from 'react';
import { puzzleCount, puzzleStop, puzzleTime } from '@/const/puzzle';
import { queueAlgorithm } from './game';
import { getAccuracy } from '@/utils/getAccuracy';
import puzzleStore from '@/stores/puzzleStore';

import type { DefaultNavigatorParams } from '@/types/navigationTypes';
import type { QuestArray } from '@/types/puzzleTypes';
import type { BtnPosType, BtnColor, BtnStateType } from '@/types/puzzleTypes';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Puzzle() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Puzzle'
  >;
  const navigation = useNavigation<NavigationProp>();

  // 문제_리스트로 넣어줄 대기열 배열 (왼쪽-문제 / 오른쪽-정답)
  const [questQueue, setQuestQueue] = useState<QuestArray[]>([
    Array.from({ length: puzzleCount }).map(_ => null),
    Array.from({ length: puzzleCount }).map(_ => null),
  ]);
  // 문제를 보여줄 리스트 (왼쪽-문제 / 오른쪽-정답)
  const [questList, setQuestList] = useState<QuestArray[]>([
    Array.from({ length: puzzleCount }).map(_ => null),
    Array.from({ length: puzzleCount }).map(_ => null),
  ]);
  // 화면에 보여지는 버튼 상태
  const [renderBtns, setRenderBtns] = useState<BtnStateType[][]>([[], []]);
  // 선택된 버튼
  const [selectedBtn, setSelectedBtn] = useState<BtnPosType | null>(null);

  // 시간
  const timer = useRef(puzzleTime);
  const interval = useRef<NodeJS.Timeout | null>(null);
  // 화면에 보여질 타이머 프레임
  const [timerFrame, setTimerFrame] = useState<number>(0);
  const timerAnimationFrame = useRef<number>(0);
  // 시간 색상
  const [timerColor, setTimerColor] = useState<
    'color-white' | 'color-yellow-400'
  >('color-white');

  // [맞은 수, 틀린 수]
  const [answerStats, setAnswerStats] = useState<number[]>([0, 0]);
  const puzzleStoreState = puzzleStore.getState();

  /**문제 생성 */
  const getQuest = () => {
    const [newQueue, newList] = queueAlgorithm(questQueue, questList);

    setQuestQueue(newQueue);
    setQuestList(newList);
  };

  /**questList의 문제들을 버튼에 넣기 */
  const resetRenderBtns = () => {
    const newRenderBtns: BtnStateType[][] = [...renderBtns];

    questList.forEach((side, i) => {
      side.forEach((quest, j) => {
        if (!renderBtns[i][j] || renderBtns[i][j]?.isOn)
          newRenderBtns[i][j] = {
            color: 'bg-light-green',
            ...quest!,
            isOn: true,
          };
      });
    });

    setRenderBtns(newRenderBtns);
  };

  /**누른 버튼 선택 */
  const selectBtn = (clickedBtn: BtnPosType | null) => {
    const newRenderBtns: BtnStateType[][] = [...renderBtns];

    // 전체 버튼 색상 초기화
    newRenderBtns.forEach(side => {
      side.forEach(btn => {
        btn.color = 'bg-light-green';
      });
    });

    if (clickedBtn) {
      // 선택한 버튼이 있으면 색상 선택
      newRenderBtns[clickedBtn.side][clickedBtn.index].color = 'bg-dark-green';
    }

    // 버튼 색상 변화
    setRenderBtns(newRenderBtns);
    // 클릭한 버튼으로 선택
    setSelectedBtn(clickedBtn);
  };

  /**버튼의 색상을 변경하고 일정시간 정지시킴 */
  const indicateBtnColor = (btn: BtnPosType, color: BtnColor) => {
    // 색상을 변화시킴
    setRenderBtns(prev => {
      const temp = [...prev];
      temp[btn.side][btn.index].color = color;
      temp[btn.side][btn.index].isOn = false;
      return temp;
    });

    // 1초 후 색상 되돌림
    setTimeout(() => {
      setRenderBtns(prev => {
        const temp = [...prev];
        temp[btn.side][btn.index].color = 'bg-light-green';
        temp[btn.side][btn.index].isOn = true;
        return temp;
      });
    }, puzzleStop);
  };

  /**버튼 클릭 이벤트 헨들러 */
  const btnEventListner = (clickedBtn: BtnPosType) => {
    // 선택된 버튼이 없다면 누른 버튼으로 선택
    if (!selectedBtn) {
      selectBtn(clickedBtn);
      return;
    }

    if (selectedBtn.side === clickedBtn.side) {
      if (selectedBtn.index === clickedBtn.index) {
        // 동일한 버튼을 다시 누르면 선택 취소
        selectBtn(null);
      } else {
        // 같은 줄의 버튼을 누르면 해당 버튼 선택
        selectBtn(clickedBtn);
      }
      return;
    }

    // 선택된 버튼과 누른 버튼이 같은 줄이 아닐 떄 실행
    const selected = renderBtns[selectedBtn.side][selectedBtn.index];
    const clicked = renderBtns[clickedBtn.side][clickedBtn.index];

    const isCorrect =
      (selected.answer && selected.answer === clicked.content) ||
      (clicked.answer && clicked.answer === selected.content);

    // 맞았는지 확인
    if (isCorrect) {
      console.log('correct');

      // 이제 정답을 맞춘다면 1초가 추가됩니다!
      timer.current += 1;
      // 잠시 타이머 색상 변경
      setTimerColor('color-yellow-400');
      setTimeout(() => {
        setTimerColor('color-white');
      }, 500);

      setQuestList(prev => {
        const temp = [...prev];
        temp[selectedBtn.side][selectedBtn.index] = null;
        temp[clickedBtn.side][clickedBtn.index] = null;
        return temp;
      });

      setAnswerStats(prev => {
        const temp = [...prev];
        temp[0] += 1;
        return temp;
      });
    } else {
      console.log('wrong');

      setAnswerStats(prev => {
        const temp = [...prev];
        temp[1] += 1;
        return temp;
      });
      indicateBtnColor(selectedBtn, 'bg-default-red');
      indicateBtnColor(clickedBtn, 'bg-default-red');
    }

    // 선택 버튼 초기화
    selectBtn(null);
  };

  /**퍼즐 타이머 시작 */
  const startTimer = () => {
    console.log('game start');
    interval.current = setInterval(() => {
      if (timer.current > 0) {
        timer.current -= 0.1;
      } else {
        // 타이머 종료
        gameEnd();
        navigation.replace('Scoreboard');
      }
    }, 100);
    animationFrame();
  };

  /**퍼즐 게임 종료 */
  const gameEnd = () => {
    console.log('game end');
    if (interval.current) {
      clearInterval(interval.current);
    }
    if (timerAnimationFrame.current) {
      cancelAnimationFrame(timerAnimationFrame.current);
    }
  };

  /**타이머 애니메이션 프레임 설정 */
  const animationFrame = () => {
    setTimerFrame(timer.current);
    timerAnimationFrame.current = requestAnimationFrame(animationFrame);
  };

  // 첫 실행시 문제 생성
  useEffect(() => {
    getQuest();
    startTimer();

    return () => {
      gameEnd();
    };
  }, []);

  useEffect(() => {
    // 퀴즈 리스트에 NULL 값이 있는지 확인하고 퀴즈를 추가함
    let isNull = false;
    questList.forEach(side => {
      side.forEach(quest => {
        if (quest === null) isNull = true;
      });
    });

    if (isNull) {
      // NULL값이 있으면 퀴즈 불러오기
      getQuest();
    } else {
      // NULL값이 없으면 버튼 랜더링
      resetRenderBtns();
    }
  }, [questList]);

  useEffect(() => {
    // 점수 정보 스토어에 저장
    puzzleStoreState.setAnswerStats(answerStats);
  }, [answerStats]);

  return (
    <SafeAreaView className="bg-default-green flex-1">
      <HeaderButton>퍼즐</HeaderButton>
      {/* 점수, 시간 */}
      <View className="items-center justify-center h-header gap-default relative">
        <TitleText size={60} className={timerColor}>{`${timerFrame.toFixed(
          1,
        )}`}</TitleText>
        <View className=" flex-row gap-20">
          <TitleText size={30}>
            {answerStats[0]} / {answerStats[1]}
          </TitleText>
          <TitleText size={30}>
            {getAccuracy(answerStats[0], answerStats[1])}%
          </TitleText>
        </View>
        <TitleText className="absolute text-center bottom-4" size={30}>
          정답을 짝지어 주세요
        </TitleText>
      </View>
      {/* 버튼 */}
      <View className="flex-row w-full flex-1 gap-default p-default">
        {[0, 1].map(side => (
          <View key={side} className="flex-1 h-full gap-default">
            {renderBtns.length > 0 &&
              renderBtns[side].map((btn, i) => {
                return (
                  <DefaultButton
                    key={i}
                    className={'flex-1 ' + btn.color}
                    onPress={() => {
                      btnEventListner({ side, index: i });
                    }}
                    disabled={!btn.isOn}
                  >
                    {btn.content}
                  </DefaultButton>
                );
              })}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
