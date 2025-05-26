import { TooltipItem } from "chart.js";
import React from "react";
import { useSelector } from "react-redux";
import { Heading } from "@chakra-ui/react";

import { LineGraph } from "../dataVisualizations/LineGraph";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { AppState } from "../../redux/rootReducer";
import { Match } from "../../types/domain/Match";

export const CommandersPlayedChart = React.memo(function CommandersPlayedChart() {
    const matches: Match[] = useSelector((state: AppState) => StatsSelectors.getMatchesByDate(state));

    if (!matches || matches.length === 0) {
        return null;
    }

    const commandersDictionary: { [id: string]: string } = {};

    const commandersCountData = matches.map((match: Match) => {
        for (const player of match.players) {
            for (const commander of player.commanders) {
                commandersDictionary[commander] = commander;
            }
        }

        return { x: Number(match.id) + 1, y: Object.keys(commandersDictionary).length };
    });

    console.log(commandersCountData);

    const tooltipTitleCallback = (item: TooltipItem<"line">[]) => {
        return `Match Id: ${matches[item[0].dataIndex].id}`;
    };

    const tooltipLabelCallback = (item: TooltipItem<"line">) => {
        return `Commanders played: ${item.formattedValue}`;
    };

    return (
        <>
            <Heading size="md">Commanders Played</Heading>
            <LineGraph
                dataLabel={"Commanders Played"}
                data={commandersCountData}
                allowTogglableDataPoints={true}
                tooltipTitleCallback={tooltipTitleCallback}
                tooltipLabelCallback={tooltipLabelCallback}
                minX={commandersCountData[0].x}
                maxX={commandersCountData[commandersCountData.length - 1].x}
            />
        </>
    );
});
