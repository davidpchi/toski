import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

import { MatchLengthLineChart } from "./MatchLengthLineChart";
import { getMatches, getPlayersByDate } from "../../redux/statsSelectors";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { Match } from "../../types/domain/Match";
import { MatchLengthBarChart } from "./MatchLengthBarChart";
import { MatchFrequencyLineChart } from "./MatchFrequencyLineChart";
import { Player } from "../../types/domain/Player";
import { MTG_COLORS } from "../constants";
import { AppState } from "../../redux/rootReducer";

export const MatchTrends = React.memo(function MatchHistory() {
    const matches = useSelector(getMatches);
    const players: Player[] = useSelector((state: AppState) => getPlayersByDate(state));

    if (matches === undefined || players === undefined) {
        return <Loading text="" />;
    }

    // cannot directly mutate state, copy to new array first
    const sortedMatches = matches.slice().sort((a: Match, b: Match) => Number(a.id) - Number(b.id));

    // Create a color dictionary to track colors played
    const colorsPlayedDictionary: Record<string, number> = MTG_COLORS.reduce<Record<string, number>>((acc, color) => {
        acc[color.id] = 0;
        return acc;
    }, {});
    // Loop through all players and update dictionary
    for (const player of players) {
        for (const colorID in player.colorProfile) {
            colorsPlayedDictionary[colorID] += player.colorProfile[colorID];
        }
    }
    // Create colors played array
    const colorsPlayedArray: number[] = [];
    for (const colorObj of MTG_COLORS) {
        colorsPlayedArray.push(colorsPlayedDictionary[colorObj.id]);
    }

    return (
        <Flex direction="column" justify="center" align="center">
            <Heading>Match Trends</Heading>
            <MatchLengthBarChart matches={sortedMatches} />
            <MatchLengthLineChart matches={sortedMatches} />
            <MatchFrequencyLineChart matches={sortedMatches} />
        </Flex>
    );
});
