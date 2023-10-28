import { TooltipItem } from "chart.js";
import React from "react";
import { Heading } from "@chakra-ui/react";

import { Match } from "../../types/domain/Match";
import { BarGraph } from "../dataVisualizations/BarGraph";

export const MatchPositionWinsBarChart = React.memo(function MatchPositionWinsBarChart({
    matches
}: {
    matches: Match[];
}) {
    const matchesPositionDictionary: { [position: string]: number } = {};

    for (const match of matches) {
        const winnerPlayer = match.players.find((player) => player.name === match.winner);
        if (winnerPlayer) {
            if (matchesPositionDictionary[winnerPlayer.turnPosition] === undefined) {
                matchesPositionDictionary[winnerPlayer.turnPosition] = 1;
            } else {
                matchesPositionDictionary[winnerPlayer.turnPosition] += 1;
            }
        }
    }

    const matchPositionWinsData = Object.keys(matchesPositionDictionary).map((position: string) => {
        return { x: Number(position), y: matchesPositionDictionary[position] };
    });

    const tooltipTitleCallback = (item: TooltipItem<"bar">[]) => {
        return `${matchPositionWinsData[item[0].dataIndex].y} wins for seat position ${
            matchPositionWinsData[item[0].dataIndex].x
        }`;
    };
    const tooltipLabelCallback = (_item: TooltipItem<"bar">) => {
        return ``;
    };

    return (
        <>
            <Heading size="md">Match Wins for Seating Position</Heading>
            <BarGraph
                dataLabel={"Match Lengths"}
                data={matchPositionWinsData}
                tooltipTitleCallback={tooltipTitleCallback}
                tooltipLabelCallback={tooltipLabelCallback}
                maxY={50}
            />
        </>
    );
});
