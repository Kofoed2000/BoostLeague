-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "currentRank" TEXT,
ADD COLUMN     "desiredRank" TEXT,
ADD COLUMN     "placementMatches" INTEGER,
ADD COLUMN     "placementRank" TEXT,
ADD COLUMN     "rewardRank" TEXT,
ADD COLUMN     "rewardWins" INTEGER,
ADD COLUMN     "tournamentRank" TEXT,
ADD COLUMN     "tournamentWins" INTEGER;
