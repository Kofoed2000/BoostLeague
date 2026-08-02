export type Extra = {
  id: string;
  title: string;
  description: string;
  priceMultiplier: number;
};

export const extras: Extra[] = [
  {
    id: "express",
    title: "Express Order",
    description: "Highest priority. Your order starts as soon as possible.",
    priceMultiplier: 1.25,
  },
  {
    id: "play-with-booster",
    title: "Play With Booster",
    description: "Queue together with one of our professional boosters.",
    priceMultiplier: 1.35,
  },
  {
    id: "stream-games",
    title: "Stream Games",
    description: "Watch every match live while the boost is in progress.",
    priceMultiplier: 1.15,
  },
];