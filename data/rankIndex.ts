import { ranks } from "./ranks";
import { divisions } from "./divisions";

export const rankIndex: Record<string, number> = {};

let index = 0;

for (const rank of ranks) {
  if (rank === "Supersonic Legend") {
    rankIndex[rank] = index;
    break;
  }

  for (const division of divisions) {
    rankIndex[`${rank} ${division}`] = index;
    index++;
  }
}