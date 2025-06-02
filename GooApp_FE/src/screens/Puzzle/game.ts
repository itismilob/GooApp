import shuffleArray from '@/utils/shuffleArray';

import { Quest, QuestArray } from '@/types/puzzleTypes';

function questGenerator(): [Quest, Quest] {
  const randA = Math.floor(Math.random() * 8) + 2;
  const randB = Math.floor(Math.random() * 8) + 2;
  const Q = `${randA} x ${randB}`;
  const A = (randA * randB).toString();

  const quest: Quest = { content: Q, answer: A, side: 0 };
  const answer: Quest = { content: A, side: 1 };

  return [quest, answer];
}

// 배열에서 랜덤한 빈 칸에 값을 추가하는 함수
const insertRandom = (array: QuestArray, Q: Quest) => {
  const empty: number[] = [];
  array.forEach((spot, i) => {
    if (spot === null) empty.push(i);
  });

  // insertRandom이 실행되면 NULL인 칸은 무조건 존재함
  const shuffled = shuffleArray(empty);
  const index = shuffled.pop()!;
  array[index] = Q;
};

export const queueAlgorithm = (
  questQueue: QuestArray[],
  questList: QuestArray[],
): [QuestArray[], QuestArray[]] => {
  // 큐와 리스트를 분할해 사용함
  const QQueue = [...questQueue[0]];
  const AQueue = [...questQueue[1]];
  const QList = [...questList[0]];
  const AList = [...questList[1]];

  // 문제_리스트의 빈칸을 모두 채운다.
  QList.forEach((Q, i) => {
    if (Q === null && QQueue[i] === null) {
      // 문제가 비어있고 문제_큐의 해당 칸이 비어있다면 - 문제를 생성한다.
      const [newQuest, newAnswer] = questGenerator();
      // 문제의 정답을 정답_큐의 랜덤 위치에 추가한다.
      insertRandom(AQueue, newAnswer);
      QList[i] = newQuest;
    } else if (Q === null && QQueue[i] !== null) {
      // 문제가 비어있고 문제_큐의 해당 칸이 존제한다면 - 문제를 채운다.
      const temp = QQueue[i];
      QQueue[i] = null;
      QList[i] = temp;
    }
  });

  // 정답_리스트의 빈칸을 모두 채운다.
  AList.forEach((A, i) => {
    if (A === null && AQueue[i] === null) {
      // 정답이 비어있고 정답_큐의 해당 칸이 비어있다면 - 문제를 생성한다.
      const [newQuest, newAnswer] = questGenerator();
      // 문제를 문제_큐의 랜덤 위치에 추가한다.
      insertRandom(QQueue, newQuest);
      AList[i] = newAnswer;
    } else if (A === null && AQueue[i] !== null) {
      // 정답이 비어있고 정답_큐의 해당 칸이 존제한다면 - 정답을 채운다.
      const temp = AQueue[i];
      AQueue[i] = null;
      AList[i] = temp;
    }
  });

  const newQueue = [QQueue, AQueue];
  const newList = [QList, AList];
  return [newQueue, newList];
};
