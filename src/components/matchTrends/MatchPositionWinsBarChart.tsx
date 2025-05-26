import { TooltipItem } from "chart.js";
import React from "react";
import { Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { Match } from "../../types/domain/Match";
import { BarGraph } from "../dataVisualizations/BarGraph";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { AppState } from "../../redux/rootReducer";

export const MatchPositionWinsBarChart = React.memo(function MatchPositionWinsBarChart() {
    const matches: Match[] = useSelector((state: AppState) => StatsSelectors.getMatchesByDate(state));

    if (!matches || matches.length === 0) {
        return null;
    }

    const matchesPositionDictionary: { [position: string]: number } = {};

    for (const match of matches) {
        const winnerPlayer = match.players.find((player) => player.name === match.winner);
        if (winnerPlayer) {
            const pos = winnerPlayer.turnPosition;
            matchesPositionDictionary[pos] = (matchesPositionDictionary[pos] || 0) + 1;
        }
    }

    const matchPositionWinsData = Object.keys(matchesPositionDictionary).map((position: string) => ({
        x: Number(position),
        y: matchesPositionDictionary[position]
    }));

    const maxCount = Math.max(...Object.values(matchesPositionDictionary));
    const maxY = Math.ceil(maxCount * 1.15); // 15% padding on top

    const tooltipTitleCallback = (item: TooltipItem<"bar">[]) => {
        const dataIndex = item[0].dataIndex;
        const wins = matchPositionWinsData[dataIndex].y;
        const position = matchPositionWinsData[dataIndex].x;
        return `${wins} wins for seat position ${position}`;
    };

    const tooltipLabelCallback = (_item: TooltipItem<"bar">) => {
        return ``;
    };

    return (
        <>
            <Heading size="md">Match Wins for Seating Position</Heading>
            <BarGraph
                dataLabel={"Match Wins by Position"}
                data={matchPositionWinsData}
                tooltipTitleCallback={tooltipTitleCallback}
                tooltipLabelCallback={tooltipLabelCallback}
                maxY={maxY}
            />
        </>
    );
});
