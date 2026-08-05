export type Checkout = {
  currentRankId: number;
  desiredRankId: number;

  platform: string;
  gameMode: string;

  extras: string[];

  orderInformation: {
    inGameUsername: string;
    preferredPlayTime: string;
    notes: string;
  };

  contactInformation: {
    email: string;
    discord: string;
  };
};