import { TooltipItem } from "chart.js";
import React from "react";
import { Heading } from "@chakra-ui/react";

import { Match } from "../../types/domain/Match";
import { LineGraph } from "../dataVisualizations/LineGraph";

export const CommandersPlayedChart = React.memo(function MatchHistory({ matches }: { matches: Match[] }) {
    let commandersDictionary: { [id: string]: string } = {};

    const commandersCountData = matches.map((match: Match, index: number) => {
        for (const player of match.players) {
            for (const commander of player.commanders) {
                commandersDictionary[commander] = commander;
            }
        }
        return { x: Number(match.id) + 1, y: Object.values(commandersDictionary).length };
    });

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
                minX={1}
                maxX={commandersCountData.length}
            />
        </>
    );
});
