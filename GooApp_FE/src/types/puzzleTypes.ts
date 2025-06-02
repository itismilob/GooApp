export type Quest = {
  content: string;
  answer?: string;
  side: number;
};

export type QuestArray = (Quest | null)[];

export type BtnPosType = { side: number; index: number };
export type BtnColor = 'bg-green-700' | 'bg-green-950' | 'bg-red-700';
export interface BtnStateType extends Quest {
  color: BtnColor;
  isOn: boolean;
}
