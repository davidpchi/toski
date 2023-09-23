import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

import { MatchLengthLineChart } from "./MatchLengthLineChart";
import { getMatches } from "../../redux/statsSelectors";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { Match } from "../../types/domain/Match";
import { CommandersPlayedChart } from "./CommandersPlayedChart";
import { MatchLengthBarChart } from "./MatchLengthBarChart";
import { MatchFrequencyLineChart } from "./MatchFrequencyLineChart";

export const MatchTrends = React.memo(function MatchHistory() {
    let matches = useSelector(getMatches);

    if (matches === undefined) {
        return <Loading text="" />;
    }

    // cannot directly mutate state, copy to new array first
    const sortedMatches = matches.slice().sort((a: Match, b: Match) => Number(a.id) - Number(b.id));

    return (
        <Flex direction='column' justify='center' align='center'>
            <Heading>Match Trends</Heading>
            <MatchLengthBarChart matches={sortedMatches} />
            <MatchLengthLineChart matches={sortedMatches} />
            <MatchFrequencyLineChart matches={sortedMatches} />
            <CommandersPlayedChart matches={sortedMatches} />
        </Flex>
    );
});