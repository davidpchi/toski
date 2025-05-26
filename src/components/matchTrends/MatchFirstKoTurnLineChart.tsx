import { TooltipItem } from "chart.js";
import React from "react";
import { Heading, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { Match } from "../../types/domain/Match";
import { LineGraph } from "../dataVisualizations/LineGraph";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { AppState } from "../../redux/rootReducer";

const getAverageFirstKOTurn = (matches: Match[]) => {
    // filter out all matches that do not have firstKnockOutTurn defined
    const filteredMatches = matches.filter((match) => match.firstKnockOutTurn !== undefined);

    let avg = 0;
    let count = 1;
    if (filteredMatches.length > 0) {
        for (let i = 0; i < filteredMatches.length; i++) {
            const firstKoTurn = filteredMatches[i].firstKnockOutTurn ?? 0;
            avg = avg + (firstKoTurn - avg) / count;
            count++;
        }
    }

    return avg.toFixed(2);
};

export const MatchFirstKoTurnLineChart = React.memo(function MatchFirstKoTurnLineChart() {
    const matches: Match[] = useSelector((state: AppState) => StatsSelectors.getMatchesByDate(state));

    if (!matches || matches.length === 0) {
        return null; // or some fallback UI
    }

    // Sort matches by numeric id ascending
    const sortedMatches = [...matches].sort((a, b) => {
        const aId = Number(a.id);
        const bId = Number(b.id);
        return (isNaN(aId) ? 0 : aId) - (isNaN(bId) ? 0 : bId);
    });

    const matchesWithKoTurn = sortedMatches.filter((match) => match.firstKnockOutTurn !== undefined);

    const matchesWithLengthsData = matchesWithKoTurn.map((match) => ({
        x: Number(match.id),
        y: Number(match.firstKnockOutTurn)
    }));

    const tooltipTitleCallback = (item: TooltipItem<"line">[]) => {
        return `Match Id: ${matchesWithKoTurn[item[0].dataIndex].id}`;
    };

    const tooltipLabelCallback = (item: TooltipItem<"line">) => {
        return `First KO Turn: ${item.formattedValue}`;
    };

    const averageMatchLength = getAverageFirstKOTurn(sortedMatches);

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
                maxX={
                    matchesWithKoTurn.length > 0
                        ? Number(matchesWithKoTurn[matchesWithKoTurn.length - 1].id)
                        : undefined
                }
            />
        </>
    );
});
