import { TooltipItem } from "chart.js";
import React from "react";
import { useSelector } from "react-redux";
import { Heading } from "@chakra-ui/react";

import { Match } from "../../types/domain/Match";
import { BarGraph } from "../dataVisualizations/BarGraph";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { AppState } from "../../redux/rootReducer";

export const MatchLengthBarChart = React.memo(function MatchLengthBarChart() {
    const matches: Match[] = useSelector((state: AppState) => StatsSelectors.getMatchesByDate(state));

    if (!matches || matches.length === 0) {
        return null;
    }

    const sortedMatches = [...matches].sort((a, b) => {
        const aId = Number(a.id);
        const bId = Number(b.id);
        return (isNaN(aId) ? 0 : aId) - (isNaN(bId) ? 0 : bId);
    });

    const matchesWithLengths = sortedMatches.filter((match) => match.numberOfTurns !== undefined);

    const matchesLengthDictionary: { [numberOfTurns: string]: number } = {};

    for (const match of matchesWithLengths) {
        const turns = match.numberOfTurns!;
        matchesLengthDictionary[turns] = (matchesLengthDictionary[turns] || 0) + 1;
    }

    const matchesWithLengthsData = Object.keys(matchesLengthDictionary).map((numberOfTurns) => {
        return { x: Number(numberOfTurns), y: matchesLengthDictionary[numberOfTurns] };
    });

    const maxCount = Math.max(...Object.values(matchesLengthDictionary));
    const maxY = Math.ceil(maxCount * 1.15); // 15% padding on top

    const tooltipTitleCallback = (item: TooltipItem<"bar">[]) => {
        return `Games with ${matchesWithLengthsData[item[0].dataIndex].x} turns: ${
            matchesWithLengthsData[item[0].dataIndex].y
        }`;
    };
    const tooltipLabelCallback = (_item: TooltipItem<"bar">) => {
        return ``;
    };

    return (
        <>
            <Heading size="md">Match Lengths</Heading>
            <BarGraph
                dataLabel={"Match Lengths"}
                data={matchesWithLengthsData}
                tooltipTitleCallback={tooltipTitleCallback}
                tooltipLabelCallback={tooltipLabelCallback}
                maxY={maxY}
            />
        </>
    );
});
