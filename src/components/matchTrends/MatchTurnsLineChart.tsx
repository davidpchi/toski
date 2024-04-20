import { TooltipItem } from "chart.js";
import React from "react";
import { Heading, Box } from "@chakra-ui/react";

import { Match } from "../../types/domain/Match";
import { LineGraph } from "../dataVisualizations/LineGraph";

const getAverageMatchLength = (matches: Match[]) => {
    // filter out all matches that do not have match length
    const filteredMatches = matches.filter((match) => match.numberOfTurns !== undefined);

    let avg = 0;
    let count = 1;
    if (filteredMatches.length > 0) {
        for (let i = 0; i < filteredMatches.length; i++) {
            // this should never be 0
            const numberOfTurns = filteredMatches[i].numberOfTurns ?? 0;
            avg = avg + (numberOfTurns - avg) / count;
            count++;
        }
    }

    // round to 2 decimal places
    return avg.toFixed(2);
};

export const MatchTurnsLineChart = React.memo(function MatchTurnsLineChart({ matches }: { matches: Match[] }) {
    const matchesWithLengths = matches.filter((match: Match) => match.numberOfTurns);

    const matchesWithLengthsData = matchesWithLengths.map((match: Match) => {
        return { x: match.id, y: Number(match.numberOfTurns) };
    });

    const tooltipTitleCallback = (item: TooltipItem<"line">[]) => {
        return `Match Id: ${matchesWithLengths[item[0].dataIndex].id}`;
    };
    const tooltipLabelCallback = (item: TooltipItem<"line">) => {
        return `Number of Turns: ${item.formattedValue}`;
    };

    const averageMatchLength = getAverageMatchLength(matches);

    return (
        <>
            <Box>{`Average Match Length in Turns: ${averageMatchLength} turns`}</Box>
            <LineGraph
                dataLabel={"Match Lengths in Turns"}
                data={matchesWithLengthsData}
                enableTrendline={true}
                allowTogglableDataPoints={true}
                tooltipTitleCallback={tooltipTitleCallback}
                tooltipLabelCallback={tooltipLabelCallback}
                maxY={20}
                maxX={Number(matchesWithLengths[matchesWithLengths.length - 1].id)}
            />
        </>
    );
});
