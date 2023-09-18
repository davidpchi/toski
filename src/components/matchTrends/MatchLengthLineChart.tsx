import {
    TooltipItem
} from 'chart.js';
import React from "react";
import { Text } from "@chakra-ui/react";

import { Match } from "../../types/domain/Match";
import { Line } from "react-chartjs-2";
import { LineGraph } from '../dataVisualizations/LineGraph';

export const MatchLengthLineChart = React.memo(function MatchHistory({ matches }: { matches: Match[] }) {
    const matchesWithLengths = matches.filter((match: Match) => match.numberOfTurns);

    const matchesWithLengthsData = matchesWithLengths.map((match: Match,) => {
        return { x: match.id, y: Number(match.numberOfTurns) };
    });

    const tooltipTitleCallback = (item: TooltipItem<"line">[]) => { return `Match Id: ${matchesWithLengths[item[0].dataIndex].id}` };
    const tooltipLabelCallback = (item: TooltipItem<"line">) => { return `Number of Turns: ${item.formattedValue}` };

    return (
        <>
            <Text>Match Lengths Over Time</Text>
            <LineGraph
                dataLabel={"Match Lengths"}
                data={matchesWithLengthsData}
                enableTrendline={true}
                allowTogglableDataPoints={true}
                tooltipTitleCallback={tooltipTitleCallback}
                tooltipLabelCallback={tooltipLabelCallback}
                maxY={20}
            />
        </>
    )
});