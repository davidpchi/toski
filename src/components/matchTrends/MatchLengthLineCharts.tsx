import React, { useState } from "react";
import { Heading, Flex, Switch } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { Match } from "../../types/domain/Match";
import { primaryColor } from "../../themes/acorn";
import { MatchTurnsLineChart } from "./MatchTurnsLineChart";
import { MatchTimeLineChart } from "./MatchTimeLineChart";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { AppState } from "../../redux/rootReducer";

export const MatchLengthLineCharts = React.memo(function MatchLengthLineCharts() {
    const [showTurns, setShowTurns] = useState<boolean>(true);

    // Get matches from redux store filtered by start date
    const matches: Match[] = useSelector((state: AppState) => StatsSelectors.getMatchesByDate(state));

    if (!matches || matches.length === 0) {
        return null; // or some fallback UI
    }

    // Sort matches by numeric id ascending
    const sortedMatches = [...matches].sort((a, b) => {
        const aId = Number(a.id);
        const bId = Number(b.id);
        return (isNaN(aId) ? 0 : aId) - (isNaN(bId) ? 0 : bId);
    });

    return (
        <>
            <Heading size="md" paddingBottom={"0px"}>
                Match Lengths Over Time
            </Heading>
            <Flex alignSelf={"stretch"} justifyContent={"center"} alignItems={"center"} flexDirection={"row"}>
                <Heading size="sm" color={showTurns ? primaryColor["500"] : undefined}>
                    Match Lengths Over Time (Turns)
                </Heading>
                <Switch
                    size={"md"}
                    onChange={() => setShowTurns(!showTurns)}
                    paddingLeft={"8px"}
                    paddingRight={"8px"}
                    alignSelf={"center"}
                    colorScheme="primary"
                    sx={{
                        "span.chakra-switch__track:not([data-checked])": {
                            backgroundColor: primaryColor["500"]
                        }
                    }}
                />
                <Heading size="sm" color={!showTurns ? primaryColor["500"] : undefined}>
                    Match Lengths Over Time (Minutes)
                </Heading>
            </Flex>
            {showTurns ? (
                <MatchTurnsLineChart matches={sortedMatches} />
            ) : (
                <MatchTimeLineChart matches={sortedMatches} />
            )}
        </>
    );
});
