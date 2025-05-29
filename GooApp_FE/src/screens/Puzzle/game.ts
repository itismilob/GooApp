import { puzzleCount } from '@/const/puzzle';
import { QuestStack } from '@/types/puzzleTypes';
import shuffleArray from '@/utils/shuffleArray';

export default function questStackGenerator(): QuestStack {
  const LStack: QuestStack = [];
  const RStack: QuestStack = [];

  let randA: number;
  let randB: number;

  let Q: string;
  let A: string;

  for (let i = 0; i < puzzleCount; i++) {
    randA = Math.floor(Math.random() * 8) + 2;
    randB = Math.floor(Math.random() * 8) + 2;
    Q = `${randA} x ${randB}`;
    A = (randA * randB).toString();

    LStack.push({ connect: i, content: Q, isCorrect: false, step: 0, side: 0 });
    RStack.push({ connect: i, content: A, isCorrect: false, step: 0, side: 0 });
  }

  return [...shuffleArray(LStack), ...shuffleArray(RStack)];
}
