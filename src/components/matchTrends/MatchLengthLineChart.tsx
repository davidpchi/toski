import { TooltipItem } from "chart.js";
import React from "react";
import { Heading } from "@chakra-ui/react";

import { Match } from "../../types/domain/Match";
import { LineGraph } from "../dataVisualizations/LineGraph";

export const MatchLengthLineChart = React.memo(function MatchLengthLineChart({ matches }: { matches: Match[] }) {
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

    return (
        <>
            <Heading size="md">Match Lengths Over Time</Heading>
            <LineGraph
                dataLabel={"Match Lengths"}
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
