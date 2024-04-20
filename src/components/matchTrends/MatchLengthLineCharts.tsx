import React, { useState } from "react";
import { Heading, Flex, Switch } from "@chakra-ui/react";

import { Match } from "../../types/domain/Match";
import { primaryColor } from "../../themes/acorn";
import { MatchTurnsLineChart } from "./MatchTurnsLineChart";
import { MatchTimeLineChart } from "./MatchTimeLineChart";

export const MatchLengthLineCharts = React.memo(function MatchLengthLineCharts({ matches }: { matches: Match[] }) {
    const [showTurns, setShowTurns] = useState<boolean>(true);

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
            {showTurns ? <MatchTurnsLineChart matches={matches} /> : <MatchTimeLineChart matches={matches} />}
        </>
    );
});
