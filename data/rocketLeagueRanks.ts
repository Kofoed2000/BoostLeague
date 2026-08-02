export type RocketLeagueRank = {
  id: number;
  rank: string;
  division: string | null;
  display: string;
  pricePerDivision: number;
  icon: string;
};

export const rocketLeagueRanks: RocketLeagueRank[] = [];

const divisions = [
  "Division I",
  "Division II",
  "Division III",
  "Division IV",
];

const rankGroups = [
  {
    name: "Bronze I",
    pricePerDivision: 1.5,
    icon: "/ranks/Bronze1_rank_icon.webp",
  },
  {
    name: "Bronze II",
    pricePerDivision: 1.5,
    icon: "/ranks/Bronze2_rank_icon.webp",
  },
  {
    name: "Bronze III",
    pricePerDivision: 1.5,
    icon: "/ranks/Bronze3_rank_icon.webp",
  },

  {
    name: "Silver I",
    pricePerDivision: 2,
    icon: "/ranks/Silver1_rank_icon.webp",
  },
  {
    name: "Silver II",
    pricePerDivision: 2,
    icon: "/ranks/Silver2_rank_icon.webp",
  },
  {
    name: "Silver III",
    pricePerDivision: 2,
    icon: "/ranks/Silver3_rank_icon.webp",
  },

  {
    name: "Gold I",
    pricePerDivision: 2.5,
    icon: "/ranks/Gold1_rank_icon.webp",
  },
  {
    name: "Gold II",
    pricePerDivision: 2.5,
    icon: "/ranks/Gold2_rank_icon.webp",
  },
  {
    name: "Gold III",
    pricePerDivision: 2.5,
    icon: "/ranks/Gold3_rank_icon.webp",
  },

  {
    name: "Platinum I",
    pricePerDivision: 3,
    icon: "/ranks/Platinum1_rank_icon.webp",
  },
  {
    name: "Platinum II",
    pricePerDivision: 3,
    icon: "/ranks/Platinum2_rank_icon.webp",
  },
  {
    name: "Platinum III",
    pricePerDivision: 3,
    icon: "/ranks/Platinum3_rank_icon.webp",
  },

  {
    name: "Diamond I",
    pricePerDivision: 4,
    icon: "/ranks/Diamond1_rank_icon.webp",
  },
  {
    name: "Diamond II",
    pricePerDivision: 4,
    icon: "/ranks/Diamond2_rank_icon.webp",
  },
  {
    name: "Diamond III",
    pricePerDivision: 4,
    icon: "/ranks/Diamond3_rank_icon.webp",
  },

  {
    name: "Champion I",
    pricePerDivision: 6,
    icon: "/ranks/Champion1_rank_icon.webp",
  },
  {
    name: "Champion II",
    pricePerDivision: 6,
    icon: "/ranks/Champion2_rank_icon.webp",
  },
  {
    name: "Champion III",
    pricePerDivision: 6,
    icon: "/ranks/Champion3_rank_icon.webp",
  },

  {
    name: "Grand Champion I",
    pricePerDivision: 9,
    icon: "/ranks/Grand_champion1_rank_icon.webp",
  },
  {
    name: "Grand Champion II",
    pricePerDivision: 9,
    icon: "/ranks/Grand_champion2_rank_icon.webp",
  },
  {
    name: "Grand Champion III",
    pricePerDivision: 9,
    icon: "/ranks/Grand_champion3_rank_icon.webp",
  },
];

let id = 0;

for (const rank of rankGroups) {
  for (const division of divisions) {
    rocketLeagueRanks.push({
      id,
      rank: rank.name,
      division,
      display: `${rank.name} • ${division}`,
      pricePerDivision: rank.pricePerDivision,
      icon: rank.icon,
    });

    id++;
  }
}

rocketLeagueRanks.push({
  id,
  rank: "Supersonic Legend",
  division: null,
  display: "Supersonic Legend",
  pricePerDivision: 12,
  icon: "/ranks/Supersonic_Legend_rank_icon.webp",
});