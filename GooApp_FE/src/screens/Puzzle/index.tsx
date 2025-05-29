import { Pressable, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DefaultNavigatorParams } from '@/types/navigationTypes';
import { useNavigation } from '@react-navigation/native';

import HeaderButton from '@/components/HeaderButton';
import TitleText from '@/components/TitleText';
import DefaultButton from '@/components/DefaultButton';
import StyledText from '@/components/StyledText';
import Information from '@/components/Information';

import questGenerator from './game';
import { useEffect, useState } from 'react';
import { QuestStack, Quest } from '@/types/puzzleTypes';
import ToggleButton from '@/components/ToggleButton';
import { puzzleCount } from '@/const/puzzle';

type BtnPosType = { side: number; index: number };
interface BtnStateType extends Quest {
  isOn: boolean;
}

export default function Puzzle() {
  type NavigationProp = NativeStackNavigationProp<
    DefaultNavigatorParams,
    'Puzzle'
  >;
  const navigation = useNavigation<NavigationProp>();

  // 화면에 보여지는 버튼 상태
  const [renderBtns, setRenderBtns] = useState<BtnStateType[]>([]);
  // 화면에 보여지는 문제들
  const [renderQuest, setRenderQuest] = useState<QuestStack>([]);
  // 퀴즈 스텍
  const [questStackList, setQuestStackList] = useState<QuestStack[]>([]);
  const [selectedBtn, setSelectedBtn] = useState<BtnPosType | null>(null);
  const [step, setStep] = useState(0);

  // 문제를 생성하고 questStackList에 추가
  const addQuestStack = () => {
    const questStack: QuestStack = questGenerator();
    questStack.map(quest => (quest.step = step));

    setStep(step + 1);
    setQuestStackList(prev => [...prev, questStack]);
  };

  // questStackList에서 풀지 않은 문제를 뽑아옴
  const resetRenderQuest = () => {
    const newRenderQuest: QuestStack = [];

    let i, j;

    console.log(questStackList);
    // return;
    for (i = 0; i < puzzleCount * 2; i++) {
      // questStackList에서 풀지 않은 문제를 선택함
      for (j = 0; j < questStackList.length; j++) {
        if (questStackList[j][i].isCorrect === false) {
          const newQuest = questStackList[j][i];

          newRenderQuest[i] = newQuest;
          break;
        }
      }
    }

    setRenderQuest(newRenderQuest);
  };

  // renderQuest를 버튼으로 변경
  const resetRenderBtns = () => {
    const newRenderBtns: BtnStateType[] = [];
    renderQuest.forEach((quest, i) => {
      newRenderBtns[i] = {
        isOn: false,
        ...quest,
      };
    });

    setRenderBtns(newRenderBtns);
  };

  // 누른 버튼 선택 함수
  const selectBtn = (clickendBtn: BtnPosType | null) => {
    const newRenderBtns: BtnStateType[] = [...renderBtns];

    if (clickendBtn) {
      // 선택한 버튼이 있으면 isOn true
      newRenderBtns[clickendBtn.index].isOn = true;
    } else {
      // null로 선택을 취소하면 전체 isOn false
      newRenderBtns.forEach(btn => {
        btn.isOn = false;
      });
    }

    // 버튼 색상 변화
    setRenderBtns(newRenderBtns);
    // 클릭한 버튼으로 선택
    setSelectedBtn(clickendBtn);
  };

  const btnEventListner = (clickendBtn: BtnPosType) => {
    // 선택된 버튼이 없다면 누른 버튼으로 선택
    if (!selectedBtn) {
      selectBtn(clickendBtn);
      return;
    }

    if (selectedBtn.side === clickendBtn.side) {
      selectBtn(null);
      selectBtn(clickendBtn);
      return;
    }

    // 선택된 버튼과 누른 버튼이 같은 줄이 아닐 떄 실행
    if (selectedBtn.side !== clickendBtn.side) {
      const selected = renderBtns[selectedBtn.index];
      const clicked = renderBtns[clickendBtn.index];

      console.log(selected, clicked);

      // 맞았는지 확인
      if (selected.connect === clicked.connect) {
        console.log('correct');

        // Q, A 정답처리
        setQuestStackList(prev => {
          const temp = [...prev];
          temp[selected.step][selectedBtn.index].isCorrect = true;
          temp[selected.step][clickendBtn.index].isCorrect = true;
          return temp;
        });
      } else {
        console.log('wrong');
      }
    } else {
      console.log('cancled');
    }

    // 선택 버튼 초기화
    selectBtn(null);
  };

  useEffect(() => {
    addQuestStack();
  }, []);

  useEffect(() => {
    if (questStackList.length == 0) return;

    // questStackList이 변하면서 마지막 문제중 하나를 맞춘다면 문제 추가
    const lastStack = questStackList[questStackList.length - 1];
    for (let i = 0; i < puzzleCount; i++) {
      if (lastStack[i].isCorrect) {
        addQuestStack();
        break;
      }
    }

    resetRenderQuest();
  }, [questStackList]);

  // renderQuest가 변화하면 btn을 변경시킨다.
  useEffect(() => {
    resetRenderBtns();
  }, [renderQuest]);

  return (
    <View className="bg-green-500 w-full h-full">
      <HeaderButton>퍼즐</HeaderButton>
      {/* 점수, 시간 */}
      <Information>
        <>
          <TitleText size={60}>남은 시간</TitleText>
          <View className="flex-row justify-between">
            <TitleText size={30}>맞은 수 / 틀린 수</TitleText>
            <TitleText size={30}>정확도%</TitleText>
          </View>
          <TitleText size={20}>정답을 짝지어 주세요</TitleText>
        </>
      </Information>
      {/* 버튼 */}
      <View className="flex-row w-full flex-1 gap-2">
        {[0, 1].map(side => (
          <View key={side} className="flex-1 h-full gap-2">
            {renderBtns.length > 0 &&
              renderBtns.map((btn, i) => {
                if (
                  i >= side * puzzleCount &&
                  i <= side * puzzleCount + (puzzleCount - 1)
                )
                  return (
                    <ToggleButton
                      key={i}
                      className={'flex-1 '}
                      isOn={btn.isOn}
                      onPress={() => {
                        btnEventListner({ side, index: i });
                      }}
                    >
                      <TitleText size={60}>{btn.content}</TitleText>
                    </ToggleButton>
                  );
              })}
          </View>
        ))}
      </View>
    </View>
  );
}
