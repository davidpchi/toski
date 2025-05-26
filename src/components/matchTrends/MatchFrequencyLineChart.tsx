import { TooltipItem } from "chart.js";
import React from "react";
import { Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { Match } from "../../types/domain/Match";
import { BarGraph } from "../dataVisualizations/BarGraph";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { AppState } from "../../redux/rootReducer";

export const MatchFrequencyLineChart = React.memo(function MatchFrequencyLineChart() {
    const matches: Match[] = useSelector((state: AppState) => StatsSelectors.getMatchesByDate(state));

    if (!matches || matches.length === 0) {
        return null;
    }

    // Sort matches by date ascending
    const sortedMatches = [...matches].sort((a, b) => a.date.getTime() - b.date.getTime());

    // Filter matches that have numberOfTurns (optional, based on your original logic)
    const matchesWithLengths = sortedMatches.filter((match) => match.numberOfTurns !== undefined);

    // Build frequency dictionary keyed by date.getTime()
    const matchesFrequencyDictionary: { [timestamp: number]: number } = {};

    for (const match of matchesWithLengths) {
        const time = match.date.getTime();
        matchesFrequencyDictionary[time] = (matchesFrequencyDictionary[time] || 0) + 1;
    }

    // Convert to chart data format and sort by date ascending
    const matchFrequencyData = Object.keys(matchesFrequencyDictionary)
        .map((timestampStr) => {
            const timestamp = Number(timestampStr);
            return { x: timestamp, y: matchesFrequencyDictionary[timestamp] };
        })
        .sort((a, b) => a.x - b.x);

    const maxCount = Math.max(...Object.values(matchesFrequencyDictionary));
    const maxY = Math.ceil(maxCount * 1.15); // 15% padding on top

    const tooltipTitleCallback = (item: TooltipItem<"bar">[]) => {
        const dataIndex = item[0].dataIndex;
        const date = new Date(matchFrequencyData[dataIndex].x);
        const count = matchFrequencyData[dataIndex].y;
        return `Games on ${date.toDateString()}: ${count}`;
    };

    const tooltipLabelCallback = (_item: TooltipItem<"bar">) => {
        return ``;
    };

    const xAxisTicksCallback = (val: number) => {
        return new Date(val).toDateString();
    };

    return (
        <>
            <Heading size="md">Match Frequency</Heading>
            <BarGraph
                dataLabel={"Match Frequency"}
                data={matchFrequencyData}
                tooltipTitleCallback={tooltipTitleCallback}
                tooltipLabelCallback={tooltipLabelCallback}
                maxY={maxY}
                minX={matchFrequencyData.length > 0 ? matchFrequencyData[0].x : undefined}
                maxX={matchFrequencyData.length > 0 ? matchFrequencyData[matchFrequencyData.length - 1].x : undefined}
                xAxisTicksCallback={xAxisTicksCallback}
            />
        </>
    );
});
