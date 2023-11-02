import { Checkbox, Flex, Input, Tooltip } from "@chakra-ui/react";
import React from "react";
import { SortableTable } from "../dataVisualizations/SortableTable";
import { playerOverviewColumns } from "../dataVisualizations/columnHelpers/playerOverviewColumnHelper";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { Player } from "../../types/domain/Player";
import { useNavigate } from "react-router-dom";
import { PLAYER_MINIMUM_GAMES_REQUIRED } from "../constants";
import { AppState } from "../../redux/rootReducer";
import { DatePicker } from "../common/DatePicker";
import { useTableFilters } from "../../logic/hooks/tableHooks";

/**
 * Component showing all the players in a big list
 */
export const PlayerOverview = React.memo(function MatchHistory() {
    const navigate = useNavigate();

    const { dateFilter, showOnlyQualfied, searchInput, onDatePickerChange, onShowOnlyQualifiedChange, onSearchChange } =
        useTableFilters();

    const allPlayers: { [id: string]: Player } | undefined = useSelector(StatsSelectors.getPlayers);
    const players: Player[] = useSelector((state: AppState) => StatsSelectors.getPlayersByDate(state, dateFilter));

    if (allPlayers === undefined) {
        return <Loading text="Loading..." />;
    }

    let playersArray = players.sort((a: Player, b: Player) => a.name.localeCompare(b.name));
    if (showOnlyQualfied) {
        playersArray = playersArray.filter(
            (value: Player) => allPlayers[value.name].validMatchesCount >= PLAYER_MINIMUM_GAMES_REQUIRED
        );
    }

    if (searchInput.length > 0 && allPlayers) {
        playersArray = playersArray.filter((value: Player) =>
            allPlayers[value.name].name.toLowerCase().includes(searchInput.toLowerCase())
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
                <DatePicker onChange={onDatePickerChange} value={dateFilter} />
                <Tooltip
                    label={<p style={{ textAlign: "center" }}>Players play 10 games to be qualified.</p>}
                    hasArrow
                    arrowSize={15}
                >
                    <div>
                        <Checkbox isChecked={showOnlyQualfied} onChange={onShowOnlyQualifiedChange}>
                            {"Show only qualified"}
                        </Checkbox>
                    </div>
                </Tooltip>
                <div style={{ padding: 20 }}>
                    <Input placeholder="Filter by..." onChange={onSearchChange} value={searchInput} />
                </div>
            </Flex>
            <SortableTable
                columns={playerOverviewColumns}
                data={playersArray}
                getRowProps={(row: any) => {
                    return {
                        onClick: () => {
                            navigate(`/playerOverview/${row.original.name}`);
                            window.scrollTo(0, 0);
                        }
                    };
                }}
            />
        </Flex>
    );
});
