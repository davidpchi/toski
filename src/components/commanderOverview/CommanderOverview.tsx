import { Checkbox, Flex, Heading, Select, Tooltip, Text } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { SortableTable } from "../dataVisualizations/SortableTable";
import { commanderOverviewColumns } from "./commanderOverviewColumnHelper";
import { getCommanders, getCommandersByDate } from "../../redux/statsSelectors";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { Commander } from "../../types/domain/Commander";
import { useNavigate } from "react-router-dom";
import { COMMANDER_MINIMUM_GAMES_REQUIRED, MTG_COLORS } from "../constants";
import { AppState } from "../../redux/rootReducer";
import { DatePicker } from "../common/DatePicker";
import { PieGraph } from "../dataVisualizations/PieGraph";

export const CommanderOverview = React.memo(function MatchHistory() {
    const navigate = useNavigate();

    const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
    const onDatePickerChange = useCallback(
        (date: Date | undefined) => {
            setDateFilter(date);
        },
        [setDateFilter],
    );

    const allCommanders = useSelector(getCommanders);
    const commanders: Commander[] = useSelector((state: AppState) => getCommandersByDate(state, dateFilter));
    const [isFiltered, setIsFiltered] = useState<boolean>(true);

    const onFilterChange = () => {
        setIsFiltered(!isFiltered);
    };

    if (commanders === undefined) {
        return <Loading text="Loading..." />;
    }

    let commandersArray = commanders.sort((a: Commander, b: Commander) => a.name.localeCompare(b.name));
    if (isFiltered && allCommanders) {
        commandersArray = commandersArray.filter((value: Commander) => allCommanders[value.id].matches.length >= COMMANDER_MINIMUM_GAMES_REQUIRED);
    }

    // Create a color dictionary to track colors played
    const colorsPlayedDictionary: Record<string, number> = MTG_COLORS.reduce<Record<string, number>>((acc, color) => {
        acc[color.id] = 0;
        return acc;
    }, {});
    // Loop through all commanders and update dictionary
    for (const commander of commandersArray) {
        for (const colorID of commander.colorIdentity) {
            colorsPlayedDictionary[colorID] += commander.matches.length;
        }
    }
    // Convert dictionary to array for display in pie
    const colorsPlayedArray: number[] = [];
    for (const colorObj of MTG_COLORS) {
        colorsPlayedArray.push(colorsPlayedDictionary[colorObj.id]);
    }

    return (
        <Flex direction="column" justify="center" align="center">
            <Heading>Commander Overview</Heading>
            <Flex direction="row" gap="30px" marginBottom="20px">
                <Flex>
                    <Flex maxWidth={175} maxHeight={175}>
                        <div style={{ flex: 1, display: "flex", width: "100%", height: "100%" }}>
                            <PieGraph
                                dataLabel={"Commanders played"}
                                data={colorsPlayedArray}
                                backgroundColors={MTG_COLORS.map((color) => color.rgb)}
                            />
                        </div>
                    </Flex>
                </Flex>

                <Flex direction="column" justifyContent="center" alignItems="flex-start">
                    <DatePicker onChange={onDatePickerChange} />
                    <Tooltip label={<p style={{ textAlign: "center" }}>Commanders play 5 games to be qualified.</p>} hasArrow arrowSize={15}>
                        <div>
                            <Checkbox isChecked={isFiltered} onChange={onFilterChange}>
                                {"Show only qualified"}
                            </Checkbox>
                        </div>
                    </Tooltip>
                </Flex>
            </Flex>

            {commandersArray.length ? (
                <SortableTable
                    columns={commanderOverviewColumns}
                    data={commandersArray}
                    getRowProps={(row: any) => {
                        return {
                            onClick: () => {
                                navigate(`/commanderOverview/${row.original.id}`);
                                window.scrollTo(0, 0);
                            },
                        };
                    }}
                />
            ) : (
                <div style={{ textAlign: "center" }}>No data</div>
            )}
        </Flex>
    );
});
