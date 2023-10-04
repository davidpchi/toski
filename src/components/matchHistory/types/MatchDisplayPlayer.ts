import { MatchDisplayCommander } from "./MatchDisplayCommander";

export type MatchDisplayPlayer = {
    name: string;
    rank: string;
    commanders: MatchDisplayCommander[];
    isWinner: boolean;
};
