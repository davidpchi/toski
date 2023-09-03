import React from "react";
import { Line } from "react-chartjs-2";
import { Flex, Heading, Text } from "@chakra-ui/react";

import { MatchLengthLineChart } from "./MatchLengthLineChart";
import { getMatches } from "../../redux/statsSelectors";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";
import { Match } from "../../types/domain/Match";
import { CommandersPlayedChart } from "./CommandersPlayedChart";
import { MatchLengthBarChart } from "./MatchLengthBarChart";

export const MatchTrends = React.memo(function MatchHistory() {
    const navigate = useNavigate();
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
            <CommandersPlayedChart matches={sortedMatches} />
        </Flex>
    );
});