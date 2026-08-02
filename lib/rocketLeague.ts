import { rocketLeagueRanks } from "@/data/rocketLeagueRanks";

export function getRankById(id: number) {
  return rocketLeagueRanks.find((rank) => rank.id === id)!;
}

export function calculatePrice(
  currentId: number,
  desiredId: number
) {
  if (desiredId <= currentId) {
    return 0;
  }

  let total = 0;

  for (let i = currentId; i < desiredId; i++) {
    total += rocketLeagueRanks[i].pricePerDivision;
  }

  return total;
}