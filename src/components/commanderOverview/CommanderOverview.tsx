import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Checkbox, Flex, Tooltip, Input } from "@chakra-ui/react";

import { SortableTable } from "../dataVisualizations/SortableTable";
import { commanderOverviewColumns } from "../dataVisualizations/columnHelpers/commanderOverviewColumnHelper";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { Loading } from "../Loading";
import { Commander } from "../../types/domain/Commander";
import { COMMANDER_MINIMUM_GAMES_REQUIRED } from "../constants";
import { AppState } from "../../redux/rootReducer";
import { DatePicker } from "../common/DatePicker";

export const CommanderOverview = React.memo(function MatchHistory() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    // try to get the date out of the search params
    const dateFilterParamRaw = searchParams.get("fromDate");
    const dateFilterParam = dateFilterParamRaw !== null ? new Date(Number(dateFilterParamRaw)) ?? undefined : undefined;
    // try to get the qualified filter out of the search params
    const onlyQualifiedParamRaw = searchParams.get("onlyQualified");
    const onlyQualifiedParam = onlyQualifiedParamRaw !== null ? onlyQualifiedParamRaw === "true" : false;
    // try to get the free form name filter out of the search params
    const nameFilterParamRaw = searchParams.get("filter");
    const nameFilterParam = nameFilterParamRaw !== null ? nameFilterParamRaw : "";

    const [dateFilter, setDateFilter] = useState<Date | undefined>(dateFilterParam);
    const onDatePickerChange = useCallback((date: Date | undefined) => {
        setDateFilter(date);
    }, []);

    const allCommanders = useSelector(StatsSelectors.getCommanders);
    const commanders: Commander[] = useSelector((state: AppState) =>
        StatsSelectors.getCommandersByDate(state, dateFilter)
    );
    const [showOnlyQualfied, setShowOnlyQualified] = useState<boolean>(onlyQualifiedParam);
    const onFilterChange = () => {
        setShowOnlyQualified(!showOnlyQualfied);
    };

    const [searchInput, setSearchInput] = useState<string>(nameFilterParam);
    const onSearchChange = useCallback(
        (event: any) => {
            setSearchInput(event.target.value);
        },
        [setSearchInput]
    );

    // this useEffect is listening to all of the filter changes and applying to them to the search parameters
    useEffect(() => {
        // date filter
        if (dateFilter) {
            searchParams.set("fromDate", dateFilter.getTime().toString());
        } else {
            searchParams.delete("fromDate");
        }
        // qualified filter
        // since the field is true, toggling it off should remove the filter
        if (showOnlyQualfied) {
            searchParams.set("onlyQualified", "true");
        } else {
            searchParams.delete("onlyQualified");
        }

        if (searchInput) {
            searchParams.set("filter", searchInput);
        } else {
            searchParams.delete("filter");
        }

        setSearchParams(searchParams);
    }, [dateFilter, nameFilterParam, searchInput, searchParams, setSearchParams, showOnlyQualfied]);

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
                        <Checkbox isChecked={showOnlyQualfied} onChange={onFilterChange}>
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
