import { TooltipItem } from "chart.js";
import React from "react";
import { Heading, Box } from "@chakra-ui/react";

import { Match } from "../../types/domain/Match";
import { LineGraph } from "../dataVisualizations/LineGraph";

const getAverageMatchLength = (matches: Match[]) => {
    // filter out all matches that do not have time length
    const filteredMatches = matches.filter((match) => match.timeLength !== undefined);

    let avg = 0;
    let count = 1;
    if (filteredMatches.length > 0) {
        for (let i = 0; i < filteredMatches.length; i++) {
            // this should never be 0
            const matchLength = filteredMatches[i].timeLength ?? 0;
            avg = avg + (matchLength - avg) / count;
            count++;
        }
    }

    // round to 2 decimal places
    return avg.toFixed(2);
};

export const MatchTimeLineChart = React.memo(function MatchTimeLineChart({ matches }: { matches: Match[] }) {
    const matchesWithTime = matches.filter((match: Match) => match.timeLength);

    const matchesWithLengthsData = matchesWithTime.map((match: Match) => {
        return { x: match.id, y: Number(match.timeLength) };
    });

    const tooltipTitleCallback = (item: TooltipItem<"line">[]) => {
        return `Match Id: ${matchesWithTime[item[0].dataIndex].id}`;
    };
    const tooltipLabelCallback = (item: TooltipItem<"line">) => {
        return `Match Length in Minutes: ${item.formattedValue}`;
    };

    const averageMatchLength = getAverageMatchLength(matches);

    return (
        <>
            <Box>{`Average Match Length in Minutes: ${averageMatchLength} minutes`}</Box>
            <LineGraph
                dataLabel={"Match Lengths in Minutes"}
                data={matchesWithLengthsData}
                enableTrendline={true}
                allowTogglableDataPoints={true}
                tooltipTitleCallback={tooltipTitleCallback}
                tooltipLabelCallback={tooltipLabelCallback}
                maxX={Number(matchesWithTime[matchesWithTime.length - 1].id)}
            />
        </>
    );
});
