import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Checkbox, Flex, Heading } from "@chakra-ui/react";

import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { Loading } from "../Loading";
import { Match } from "../../types/domain/Match";
import { CommandersPlayedChart } from "./CommandersPlayedChart";
import { MTG_COLORS, MTG_COLOR_IDENTITIES } from "../constants";
import { PieGraph } from "../dataVisualizations/PieGraph";
import { AppState } from "../../redux/rootReducer";
import { Commander } from "../../types/domain/Commander";

export const CommanderTrends = React.memo(function CommanderTrends() {
    const matches = useSelector(StatsSelectors.getMatches);
    const commanders: Commander[] = useSelector((state: AppState) => StatsSelectors.getCommandersByDate(state));

    const [showAdvancedColorChart, setShowAdvancedColorChart] = useState<boolean>(false);

    const toggleAdvancedColorChart = () => {
        setShowAdvancedColorChart(!showAdvancedColorChart);
    };

    if (matches === undefined || commanders === undefined) {
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
    for (const commander of commanders) {
        for (const colorID of commander.colorIdentity) {
            colorsPlayedDictionary[colorID]++;
        }

        colorIdentitiesPlayedDictionary[commander.colorIdentityName]++;
    }

    // Create colors played array
    let colorsPlayedArray: { name: string; value: number; color: string }[] = [];
    for (const colorObj of MTG_COLORS) {
        const count = colorsPlayedDictionary[colorObj.id];

        if (count > 0) {
            colorsPlayedArray.push({
                name: colorObj.name,
                value: colorsPlayedDictionary[colorObj.id],
                color: colorObj.rgb
            });
        }
    }

    colorsPlayedArray = colorsPlayedArray.sort((a, b) => b.value - a.value);

    // Create color identities played array
    let colorIdentitiesPlayedArray: { name: string; value: number; color: string }[] = [];
    for (const colorObj of MTG_COLOR_IDENTITIES) {
        const count = colorIdentitiesPlayedDictionary[colorObj.id];
        if (count > 0) {
            colorIdentitiesPlayedArray.push({
                name: colorObj.name,
                value: colorIdentitiesPlayedDictionary[colorObj.id],
                color: colorObj.rgb
            });
        }
    }

    colorIdentitiesPlayedArray = colorIdentitiesPlayedArray.sort((a, b) => b.value - a.value);

    return (
        <Flex direction="column" justify="center" align="center">
            <Heading size="md">Commander Colors Played</Heading>
            <Flex maxWidth={"750px"} justifyContent={"center"} alignItems={"center"}>
                {!showAdvancedColorChart ? (
                    <PieGraph
                        dataLabel={"Commanders played"}
                        data={colorsPlayedArray}
                        backgroundColors={colorsPlayedArray.map((item) => item.color)}
                        showLegend={true}
                        maxDimension={350}
                    />
                ) : (
                    <PieGraph
                        dataLabel={"Commanders played"}
                        data={colorIdentitiesPlayedArray}
                        backgroundColors={colorIdentitiesPlayedArray.map((item) => item.color)}
                        showLegend={true}
                        maxDimension={350}
                    />
                )}
            </Flex>
            <Checkbox isChecked={showAdvancedColorChart} onChange={toggleAdvancedColorChart} marginTop={"16px"}>
                {"Show Advanced Color Chart"}
            </Checkbox>
            <CommandersPlayedChart matches={sortedMatches} />
        </Flex>
    );
});
