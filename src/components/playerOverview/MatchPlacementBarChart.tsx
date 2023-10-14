import { TooltipItem } from "chart.js";
import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";

import { Loading } from "../Loading";
import { Match } from "../../types/domain/Match";
import { BarGraph } from "../dataVisualizations/BarGraph";
import { PLAYER_MINIMUM_GAMES_REQUIRED } from "../constants";
import { InsufficientData } from "./InsufficientData";

export const MatchPlacementBarChart = React.memo(function MatchPlacementBarChart({
    matches,
    playerId
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

    return (
        <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"} padding="8px">
            <Heading size="md">Match Placements</Heading>
            {matches.length >= PLAYER_MINIMUM_GAMES_REQUIRED ? (
                <BarGraph
                    dataLabel={"Match Placement Count"}
                    data={matchPlacementData}
                    tooltipTitleCallback={tooltipTitleCallback}
                    tooltipLabelCallback={tooltipLabelCallback}
                    maxY={matches.length}
                />
            ) : (
                <InsufficientData description={"Not enough matches"} />
            )}
        </Flex>
    );
});
