import { Checkbox, Flex, Heading, Tooltip } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { SortableTable } from "../dataVisualizations/SortableTable";
import { playerOverviewColumns } from "./playerOverviewColumnHelper";
import { getPlayers, getPlayersByDate } from "../../redux/statsSelectors";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { Player } from "../../types/domain/Player";
import { useNavigate } from "react-router-dom";
import { PLAYER_MINIMUM_GAMES_REQUIRED } from "../constants";
import { AppState } from "../../redux/rootReducer";
import { DatePicker } from "../common/DatePicker";

/**
 * Component showing all the players in a big list
 */
export const PlayerOverview = React.memo(function MatchHistory() {
    const navigate = useNavigate();

    const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
    const onDatePickerChange = useCallback(
        (date: Date | undefined) => {
            setDateFilter(date);
        },
        [setDateFilter],
    );

    const allPlayers: { [id: string]: Player } | undefined = useSelector(getPlayers);
    const players: Player[] = useSelector((state: AppState) => getPlayersByDate(state, dateFilter));

    const [isFiltered, setIsFiltered] = useState<boolean>(true);
    const onFilterChange = () => {
        setIsFiltered(!isFiltered);
    };

    if (allPlayers === undefined) {
        return <Loading text="Loading..." />;
    }

    let playersArray = players.sort((a: Player, b: Player) => a.name.localeCompare(b.name));
    if (isFiltered) {
        playersArray = playersArray.filter(
            (value: Player) => allPlayers[value.name].matches.length >= PLAYER_MINIMUM_GAMES_REQUIRED,
        );
    }

    return (
        <Flex direction="column" justify="center" align="center">
            <Flex alignSelf={"center"} marginBottom={"16px"} alignItems={"center"}>
                <DatePicker onChange={onDatePickerChange} />
                <Tooltip
                    label={<p style={{ textAlign: "center" }}>Players play 10 games to be qualified.</p>}
                    hasArrow
                    arrowSize={15}
                >
                    <div>
                        <Checkbox isChecked={isFiltered} onChange={onFilterChange}>
                            {"Show only qualified"}
                        </Checkbox>
                    </div>
                </Tooltip>
            </Flex>
            <SortableTable
                columns={playerOverviewColumns}
                data={playersArray}
                getRowProps={(row: any) => {
                    return {
                        onClick: () => {
                            navigate(`/playerOverview/${row.original.name}`);
                            window.scrollTo(0, 0);
                        },
                    };
                }}
            />
        </Flex>
    );
});
