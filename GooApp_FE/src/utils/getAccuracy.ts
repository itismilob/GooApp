export const getAccuracy = (correct: number, wrong: number): number => {
  const total = correct + wrong;
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};
