import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Checkbox, Flex, Heading } from "@chakra-ui/react";

import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { Loading } from "../Loading";
import { MTG_COLORS, MTG_COLOR_IDENTITIES } from "../constants";
import { PieGraph } from "../dataVisualizations/PieGraph";
import { AppState } from "../../redux/rootReducer";
import { Commander } from "../../types/domain/Commander";
import { CommandersPlayedChart } from "./CommandersPlayedChart";

export const CommanderTrends = React.memo(function CommanderTrends() {
    const commanders: Commander[] = useSelector((state: AppState) => StatsSelectors.getCommandersByDate(state));

    const [showAdvancedColorChart, setShowAdvancedColorChart] = useState<boolean>(false);

    const toggleAdvancedColorChart = () => {
        setShowAdvancedColorChart(!showAdvancedColorChart);
    };

    if (commanders === undefined) {
        return <Loading text="" />;
    }

    // Track colors and color identities played
    const colorsPlayedDictionary = MTG_COLORS.reduce<Record<string, number>>((acc, { id }) => {
        acc[id] = 0;
        return acc;
    }, {});

    const colorIdentitiesPlayedDictionary = MTG_COLOR_IDENTITIES.reduce<Record<string, number>>((acc, { id }) => {
        acc[id] = 0;
        return acc;
    }, {});

    for (const commander of commanders) {
        for (const colorID of commander.colorIdentity) {
            colorsPlayedDictionary[colorID]++;
        }
        colorIdentitiesPlayedDictionary[commander.colorIdentityName]++;
    }

    // Build arrays for charts
    const colorsPlayedArray = MTG_COLORS.map(({ id, name, rgb }) => ({
        name,
        value: colorsPlayedDictionary[id],
        color: rgb
    }))
        .filter(({ value }) => value > 0)
        .sort((a, b) => b.value - a.value);

    const colorIdentitiesPlayedArray = MTG_COLOR_IDENTITIES.map(({ id, name, rgb }) => ({
        name,
        value: colorIdentitiesPlayedDictionary[id],
        color: rgb
    }))
        .filter(({ value }) => value > 0)
        .sort((a, b) => b.value - a.value);

    return (
        <Flex direction="column" justify="center" align="center">
            <Heading size="md">Commander Colors Played</Heading>
            <Flex maxWidth="750px" justifyContent="center" alignItems="center">
                <PieGraph
                    dataLabel="Commanders played"
                    data={showAdvancedColorChart ? colorIdentitiesPlayedArray : colorsPlayedArray}
                    backgroundColors={(showAdvancedColorChart ? colorIdentitiesPlayedArray : colorsPlayedArray).map(
                        (item) => item.color
                    )}
                    showLegend
                    maxDimension={350}
                />
            </Flex>
            <Checkbox isChecked={showAdvancedColorChart} onChange={toggleAdvancedColorChart} mt="16px">
                Show Advanced Color Chart
            </Checkbox>
            <CommandersPlayedChart />
        </Flex>
    );
});
