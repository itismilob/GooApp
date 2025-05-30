export type Quest = {
  content: string;
  answer?: string;
  side: number;
};

export type QuestArray = (Quest | null)[];
