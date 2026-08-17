export type Checkout = {
  serviceType: string;

  currentRankId: number;
  desiredRankId: number;

  platform: string;
  gameMode: string;

  extras: string[];

  orderInformation: {
    notes: string;
  };

  contactInformation: {
    email: string;
    discord: string;
  };
};