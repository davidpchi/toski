import { Match } from "./Match";

export type Commander = {
    id: string;
    name: string;
    matches: Match[];
    wins: number;
}