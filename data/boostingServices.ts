export type SimpleRocketLeagueRank =
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Diamond"
  | "Champion"
  | "Grand Champion"
  | "Supersonic Legend";

export const simpleRocketLeagueRanks: SimpleRocketLeagueRank[] = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Champion",
  "Grand Champion",
  "Supersonic Legend",
];

export const rewardWinPrices: Record<SimpleRocketLeagueRank, number> = {
  Bronze: 0.75,
  Silver: 1.0,
  Gold: 1.2,
  Platinum: 1.4,
  Diamond: 1.7,
  Champion: 2.0,
  "Grand Champion": 2.5,
  "Supersonic Legend": 3.5,
};

export const tournamentWinPrices: Record<
  SimpleRocketLeagueRank,
  number
> = {
  Bronze: 8,
  Silver: 12,
  Gold: 16,
  Platinum: 20,
  Diamond: 25,
  Champion: 35,
  "Grand Champion": 55,
  "Supersonic Legend": 95,
};

export const tournamentWinOptions = [1, 2, 3] as const;

export type BoostingService =
  | "rankBoost"
  | "rewardWins"
  | "tournamentWins";