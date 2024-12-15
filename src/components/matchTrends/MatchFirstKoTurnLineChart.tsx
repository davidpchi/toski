import { TooltipItem } from "chart.js";
import React from "react";
import { Heading, Box } from "@chakra-ui/react";

import { Match } from "../../types/domain/Match";
import { LineGraph } from "../dataVisualizations/LineGraph";

const getAverageFirstKOTurn = (matches: Match[]) => {
    // filter out all matches that do not have match length
    const filteredMatches = matches.filter((match) => match.firstKnockOutTurn !== undefined);

    let avg = 0;
    let count = 1;
    if (filteredMatches.length > 0) {
        for (let i = 0; i < filteredMatches.length; i++) {
            // this should never be 0
            const firstKoTurn = filteredMatches[i].firstKnockOutTurn ?? 0;
            avg = avg + (firstKoTurn - avg) / count;
            count++;
        }
    }

    // round to 2 decimal places
    return avg.toFixed(2);
};

export const MatchFirstKoTurnLineChart = React.memo(function MatchFirstKoTurnLineChart({
    matches
}: {
    matches: Match[];
}) {
    const matchesWithKoTurn = matches.filter((match: Match) => match.firstKnockOutTurn);

    const matchesWithLengthsData = matchesWithKoTurn.map((match: Match) => {
        return { x: match.id, y: Number(match.numberOfTurns) };
    });

    const tooltipTitleCallback = (item: TooltipItem<"line">[]) => {
        return `Match Id: ${matchesWithKoTurn[item[0].dataIndex].id}`;
    };
    const tooltipLabelCallback = (item: TooltipItem<"line">) => {
        return `First KO Turn: ${item.formattedValue}`;
    };

    const averageMatchLength = getAverageFirstKOTurn(matches);

    return (
        <>
            <Heading size="md">First KO Turn</Heading>
            <Box>{`Average First KO Turn: ${averageMatchLength}`}</Box>
            <LineGraph
                dataLabel={"First KO Turn"}
                data={matchesWithLengthsData}
                enableTrendline={true}
                allowTogglableDataPoints={true}
                tooltipTitleCallback={tooltipTitleCallback}
                tooltipLabelCallback={tooltipLabelCallback}
                maxY={20}
                maxX={Number(matchesWithKoTurn[matchesWithKoTurn.length - 1].id)}
            />
        </>
    );
});
