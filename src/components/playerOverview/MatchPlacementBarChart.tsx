import { TooltipItem } from "chart.js";
import React from "react";
import { Flex, Text } from "@chakra-ui/react";

import { Loading } from "../Loading";
import { Match } from "../../types/domain/Match";
import { BarGraph } from "../dataVisualizations/BarGraph";

export const MatchPlacementBarChart = React.memo(function MatchPlacementBarChart({
    matches,
    playerId,
}: {
    matches: Match[];
    playerId: string;
}) {
    if (matches === undefined) {
        return <Loading text="" />;
    }

    const matchPlacementDictionary: { [rank: string]: number } = {};

    for (const match of matches) {
        for (const player of match.players) {
            if (player.name === playerId) {
                if (matchPlacementDictionary[player.rank] === undefined) {
                    matchPlacementDictionary[player.rank] = 1;
                } else {
                    matchPlacementDictionary[player.rank] += 1;
                }
            }
        }
    }

    const matchPlacementData = Object.keys(matchPlacementDictionary).map((rank: string) => {
        return { x: Number(rank), y: matchPlacementDictionary[rank] };
    });

    const tooltipTitleCallback = (item: TooltipItem<"bar">[]) => {
        return `Games placed in rank ${matchPlacementData[item[0].dataIndex].x}: ${
            matchPlacementData[item[0].dataIndex].y
        }`;
    };
    const tooltipLabelCallback = (_item: TooltipItem<"bar">) => {
        return ``;
    };

    // cannot directly mutate state, copy to new array first
    const sortedMatches = matches.slice().sort((a: Match, b: Match) => Number(a.id) - Number(b.id));

    return (
        <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"} padding="8px">
            <Text>Match Placements</Text>
            <BarGraph
                dataLabel={"Match Placement Count"}
                data={matchPlacementData}
                tooltipTitleCallback={tooltipTitleCallback}
                tooltipLabelCallback={tooltipLabelCallback}
                maxY={matches.length}
            />
        </Flex>
    );
});
