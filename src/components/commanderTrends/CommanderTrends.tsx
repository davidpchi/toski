import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Checkbox, Flex, Heading } from "@chakra-ui/react";

import { CommandersSelectors } from "../../redux/commanders/commandersSelectors";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { Loading } from "../Loading";
import { MTG_COLORS, MTG_COLOR_IDENTITIES } from "../constants";
import { PieGraph } from "../dataVisualizations/PieGraph";
import { AppState } from "../../redux/rootReducer";
import { Commander } from "../../types/domain/Commander";
import { CommandersPlayedChart } from "./CommandersPlayedChart";
import { CommanderData } from "../../services/CommanderService";
import { getColorIdentity } from "../../logic/utils";

export const CommanderTrends = React.memo(function CommanderTrends() {
    const playedCommanders: Commander[] = useSelector((state: AppState) => StatsSelectors.getCommandersByDate(state));
    const commanderDefinitions: CommanderData[] = useSelector((state: AppState) =>
        CommandersSelectors.getAllCommanders(state)
    );

    const [showAdvancedColorChart, setShowAdvancedColorChart] = useState<boolean>(false);

    const toggleAdvancedColorChart = () => {
        setShowAdvancedColorChart(!showAdvancedColorChart);
    };

    if (playedCommanders === undefined || commanderDefinitions === undefined) {
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

    for (const commander of playedCommanders) {
        // The played commanders object does not contain a populated colorIdentity.
        // We must obtain that from the "commander data" collection by looking it up.
        const commanderData = commanderDefinitions.find((cd) => cd.id === commander.id);

        if (!commanderData) {
            continue;
        }

        for (const colorID of commanderData.colorIdentity) {
            colorsPlayedDictionary[colorID]++;
        }

        const resolvedColorIdentity = getColorIdentity(commanderData.colorIdentity);

        if (resolvedColorIdentity) {
            colorIdentitiesPlayedDictionary[resolvedColorIdentity]++;
        }
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
