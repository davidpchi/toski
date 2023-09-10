import { MatchDisplayCommander } from "./MatchDisplayCommander";

export type MatchDisplayPlayer = {
    name: string;
    commanders: MatchDisplayCommander[];
    isWinner: boolean;
};
