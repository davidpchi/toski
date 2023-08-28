import { Match } from "./Match";

export type Player = {
    name: string;
    matches: Match[];
    wins: number;
}