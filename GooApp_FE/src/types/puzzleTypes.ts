export interface Quest {
  connect: number;
  content: string;
  isCorrect: boolean;
  step: number;
  side: number;
}

export type QuestStack = Quest[];
