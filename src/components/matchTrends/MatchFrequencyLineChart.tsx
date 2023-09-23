import {
    TooltipItem
} from 'chart.js';
import React from "react";
import { Heading, Text } from "@chakra-ui/react";

import { Match } from "../../types/domain/Match";
import { BarGraph } from '../dataVisualizations/BarGraph';

export const MatchFrequencyLineChart = React.memo(function MatchFrequencyLineChart({ matches }: { matches: Match[] }) {
    const matchesWithLengths = matches.filter((match: Match) => match.numberOfTurns);

    const matchesFrequencyDictionary: { [numberOfTurns: string]: number } = {};

    for (const match of matchesWithLengths) {
        if (matchesFrequencyDictionary[match.date.getTime()] === undefined) {
            matchesFrequencyDictionary[match.date.getTime()] = 1;
        } else {
            matchesFrequencyDictionary[match.date.getTime()] += 1;
        }
    }

    const matchFrequencyData = Object.keys(matchesFrequencyDictionary).map((date: string) => {
        return { x: date, y: matchesFrequencyDictionary[date] };
    }).sort((a, b) => Number(a.x) - Number(b.x));

    const tooltipTitleCallback = (item: TooltipItem<"bar">[]) => {
        console.log(item);
        return `Games on ${(new Date(Number(matchFrequencyData[item[0].dataIndex].x)).toDateString())}: ${matchFrequencyData[item[0].dataIndex].y}`
    };
    const tooltipLabelCallback = (_item: TooltipItem<"bar">) => { return `` };

    const xAxisTicksCallback = (val: any, index: any) => {
        return (new Date(val)).toDateString();
    };

    return (
        <>
            <Heading size="md">Match Frequnecy</Heading>
            <BarGraph
                dataLabel={"Match Frequency"}
                data={matchFrequencyData}
                tooltipTitleCallback={tooltipTitleCallback}
                tooltipLabelCallback={tooltipLabelCallback}
                maxY={10}
                minX={Number(matchFrequencyData[0].x)}
                maxX={Number(matchFrequencyData[matchFrequencyData.length - 1].x)}
                xAxisTicksCallback={xAxisTicksCallback}
            />
        </>
    )
});