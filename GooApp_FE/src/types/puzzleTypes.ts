export type Quest = {
  content: string;
  answer?: string;
  side: number;
};

export type QuestArray = (Quest | null)[];

export type BtnPosType = { side: number; index: number };
export type BtnColor = 'bg-light-green' | 'bg-dark-green' | 'bg-default-red';
export interface BtnStateType extends Quest {
  color: BtnColor;
  isOn: boolean;
}
