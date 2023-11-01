import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Checkbox, Flex, Input, Tooltip } from "@chakra-ui/react";

import { SortableTable } from "../dataVisualizations/SortableTable";
import { commanderOverviewColumns } from "../dataVisualizations/columnHelpers/commanderOverviewColumnHelper";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { Loading } from "../Loading";
import { Commander } from "../../types/domain/Commander";
import { COMMANDER_MINIMUM_GAMES_REQUIRED } from "../constants";
import { AppState } from "../../redux/rootReducer";
import { DatePicker } from "../common/DatePicker";
import { useTableFilters } from "../../logic/hooks/tableHooks";

export const CommanderOverview = React.memo(function MatchHistory() {
    const navigate = useNavigate();

    const allCommanders = useSelector(StatsSelectors.getCommanders);
    const { dateFilter, showOnlyQualfied, searchInput, onDatePickerChange, onShowOnlyQualifiedChange, onSearchChange } =
        useTableFilters();

    const commanders: Commander[] = useSelector((state: AppState) =>
        StatsSelectors.getCommandersByDate(state, dateFilter)
    );
    if (commanders === undefined || commanders.length === 0) {
        return <Loading text="Loading..." />;
    }

    let commandersArray = commanders.sort((a: Commander, b: Commander) => a.name.localeCompare(b.name));

    if (showOnlyQualfied && allCommanders) {
        commandersArray = commandersArray.filter(
            (value: Commander) => allCommanders[value.id].validMatchesCount >= COMMANDER_MINIMUM_GAMES_REQUIRED
        );
    }
    if (searchInput.length > 0 && allCommanders) {
        commandersArray = commandersArray.filter((value: Commander) =>
            allCommanders[value.id].name.toLowerCase().includes(searchInput.toLowerCase())
        );
    }

    return (
        <Flex direction="column" justify="center" align="center">
            <Flex
                alignSelf={"center"}
                marginBottom={"16px"}
                alignItems={"center"}
                flexWrap={"wrap"}
                justifyContent={"center"}
            >
                {
                    // TODO: The date picker needs to properly intialize to what the url parameter is
                }
                <DatePicker onChange={onDatePickerChange} />
                <Tooltip
                    label={<p style={{ textAlign: "center" }}>Commanders play 5 games to be qualified.</p>}
                    hasArrow
                    arrowSize={15}
                >
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <Checkbox isChecked={showOnlyQualfied} onChange={onShowOnlyQualifiedChange}>
                            {"Show only qualified"}
                        </Checkbox>
                    </div>
                </Tooltip>
                <div style={{ padding: 20 }}>
                    <Input placeholder="Filter by..." onChange={onSearchChange} value={searchInput} />
                </div>
            </Flex>
            {commandersArray.length > 0 ? (
                <SortableTable
                    columns={commanderOverviewColumns}
                    data={commandersArray}
                    getRowProps={(row: any) => {
                        return {
                            onClick: () => {
                                navigate(`/commanderOverview/${row.original.id}`);
                                window.scrollTo(0, 0);
                            }
                        };
                    }}
                />
            ) : (
                <div style={{ textAlign: "center" }}>No data</div>
            )}
        </Flex>
    );
});
