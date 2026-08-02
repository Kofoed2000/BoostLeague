import { rankIndex } from "./rankIndex";

export function calculatePrice(
  currentRank: string,
  currentDivision: string,
  desiredRank: string,
  desiredDivision: string
) {
  const current =
    currentRank === "Supersonic Legend"
      ? rankIndex[currentRank]
      : rankIndex[`${currentRank} ${currentDivision}`];

  const desired =
    desiredRank === "Supersonic Legend"
      ? rankIndex[desiredRank]
      : rankIndex[`${desiredRank} ${desiredDivision}`];

  const divisions = Math.max(0, desired - current);

  return divisions * 2;
}