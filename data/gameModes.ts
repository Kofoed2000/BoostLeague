export type GameMode = {
  id: string;
  name: string;
  description: string;
  icon: string;
  priceMultiplier: number;
};

export const gameModes: GameMode[] = [
  {
    id: "2v2",
    name: "2v2 Doubles",
    description: "Most popular",
    icon: "🎯",
    priceMultiplier: 1,
  },
  {
    id: "3v3",
    name: "3v3 Standard",
    description: "+15%",
    icon: "🛡️",
    priceMultiplier: 1.15,
  },
  {
    id: "1v1",
    name: "1v1 Duel",
    description: "+30%",
    icon: "⚔️",
    priceMultiplier: 1.3,
  },
  {
    id: "rumble",
    name: "Rumble",
    description: "+40%",
    icon: "🌀",
    priceMultiplier: 1.4,
  },
  {
    id: "hoops",
    name: "Hoops",
    description: "+40%",
    icon: "🏀",
    priceMultiplier: 1.4,
  },
  {
    id: "snowday",
    name: "Snow Day",
    description: "+50%",
    icon: "❄️",
    priceMultiplier: 1.5,
  },
  {
    id: "dropshot",
    name: "Dropshot",
    description: "+60%",
    icon: "💥",
    priceMultiplier: 1.6,
  },
];