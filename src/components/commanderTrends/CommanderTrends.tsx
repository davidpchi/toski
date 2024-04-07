import React, { useState } from "react";
import { Checkbox, Flex, Heading, color } from "@chakra-ui/react";

import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { Match } from "../../types/domain/Match";
import { CommandersPlayedChart } from "./CommandersPlayedChart";
import { Player } from "../../types/domain/Player";
import { MTG_COLORS, MTG_COLOR_IDENTITIES } from "../constants";
import { PieGraph } from "../dataVisualizations/PieGraph";
import { AppState } from "../../redux/rootReducer";

export const CommanderTrends = React.memo(function CommanderTrends() {
    const matches = useSelector(StatsSelectors.getMatches);
    const players: Player[] = useSelector((state: AppState) => StatsSelectors.getPlayersByDate(state));

    const [showAdvancedColorChart, setShowAdvancedColorChart] = useState<boolean>(false);

    const toggleAdvancedColorChart = () => {
        setShowAdvancedColorChart(!showAdvancedColorChart);
    };

    if (matches === undefined || players === undefined) {
        return <Loading text="" />;
    }

    // cannot directly mutate state, copy to new array first
    const sortedMatches = matches.slice().sort((a: Match, b: Match) => Number(a.id) - Number(b.id));

    // Create a color dictionary to track colors played
    const colorsPlayedDictionary: Record<string, number> = MTG_COLORS.reduce<Record<string, number>>((acc, color) => {
        acc[color.id] = 0;
        return acc;
    }, {});

    // Create a color identities dictionary to track color identities played
    const colorIdentitiesPlayedDictionary: Record<string, number> = MTG_COLOR_IDENTITIES.reduce<Record<string, number>>(
        (acc, color) => {
            acc[color.id] = 0;
            return acc;
        },
        {}
    );

    // Loop through all players and update dictionaries that count the number of colors and color identities
    for (const player of players) {
        for (const colorID in player.colorProfile.colors) {
            colorsPlayedDictionary[colorID] += player.colorProfile.colors[colorID];
        }

        for (const colorID in player.colorProfile.colorIdentities) {
            colorIdentitiesPlayedDictionary[colorID] += player.colorProfile.colorIdentities[colorID];
        }
    }

    // Create colors played array
    const colorsPlayedArray: { name: string; value: number }[] = [];
    for (const colorObj of MTG_COLORS) {
        colorsPlayedArray.push({
            name: colorObj.name,
            value: colorsPlayedDictionary[colorObj.id]
        });
    }

    // Create color identities played array
    const colorIdentitiesPlayedArray: { name: string; value: number }[] = [];
    for (const colorObj of MTG_COLOR_IDENTITIES) {
        colorIdentitiesPlayedArray.push({
            name: colorObj.name,
            value: colorIdentitiesPlayedDictionary[colorObj.id]
        });
    }

    console.log(colorIdentitiesPlayedArray);

    return (
        <Flex direction="column" justify="center" align="center">
            <Heading size="md">Commander Colors Played</Heading>
            <Flex width={350} height={350}>
                {!showAdvancedColorChart ? (
                    <div style={{ flex: 1, display: "flex", width: "100%", height: "100%" }}>
                        <PieGraph
                            dataLabel={"Commanders played"}
                            data={colorsPlayedArray}
                            backgroundColors={MTG_COLORS.map((color) => color.rgb)}
                        />
                    </div>
                ) : (
                    <div style={{ flex: 1, display: "flex", width: "200", height: "100%" }}>
                        <PieGraph
                            dataLabel={"Commanders played"}
                            data={colorIdentitiesPlayedArray}
                            backgroundColors={MTG_COLOR_IDENTITIES.map((color) => color.rgb)}
                        />
                    </div>
                )}
            </Flex>

            <Checkbox isChecked={showAdvancedColorChart} onChange={toggleAdvancedColorChart} marginTop={"16px"}>
                {"Show Advanced Color Chart"}
            </Checkbox>
            <CommandersPlayedChart matches={sortedMatches} />
        </Flex>
    );
});
