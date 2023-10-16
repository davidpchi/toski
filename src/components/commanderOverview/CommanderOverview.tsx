import { Checkbox, Flex, Tooltip, Input } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { SortableTable } from "../dataVisualizations/SortableTable";
import { commanderOverviewColumns } from "../dataVisualizations/columnHelpers/commanderOverviewColumnHelper";
import { getCommanders, getCommandersByDate } from "../../redux/stats/statsSelectors";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { Commander } from "../../types/domain/Commander";
import { useNavigate } from "react-router-dom";
import { COMMANDER_MINIMUM_GAMES_REQUIRED } from "../constants";
import { AppState } from "../../redux/rootReducer";
import { DatePicker } from "../common/DatePicker";

export const CommanderOverview = React.memo(function MatchHistory() {
    const navigate = useNavigate();

    const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
    const onDatePickerChange = useCallback(
        (date: Date | undefined) => {
            setDateFilter(date);
        },
        [setDateFilter]
    );

    const allCommanders = useSelector(getCommanders);
    const commanders: Commander[] = useSelector((state: AppState) => getCommandersByDate(state, dateFilter));
    const [isFiltered, setIsFiltered] = useState<boolean>(true);
    const onFilterChange = () => {
        setIsFiltered(!isFiltered);
    };

    const [searchInput, setSearchInput] = useState<string>("");
    const onSearchChange = useCallback(
        (event: any) => {
            setSearchInput(event.target.value);
        },
        [setSearchInput]
    );

    if (commanders === undefined || commanders.length === 0) {
        return <Loading text="Loading..." />;
    }

    let commandersArray = commanders.sort((a: Commander, b: Commander) => a.name.localeCompare(b.name));
    if (isFiltered && allCommanders) {
        commandersArray = commandersArray.filter(
            (value: Commander) => allCommanders[value.id].matches.length >= COMMANDER_MINIMUM_GAMES_REQUIRED
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
                <DatePicker onChange={onDatePickerChange} />
                <Tooltip
                    label={<p style={{ textAlign: "center" }}>Commanders play 5 games to be qualified.</p>}
                    hasArrow
                    arrowSize={15}
                >
                    <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                        <Checkbox isChecked={isFiltered} onChange={onFilterChange}>
                            {"Show only qualified"}
                        </Checkbox>
                    </div>
                </Tooltip>
                <div style={{ padding: 20 }}>
                    <Input placeholder="Filter by..." onChange={onSearchChange} />
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
