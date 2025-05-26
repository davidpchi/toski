import { Box, Checkbox, Flex, Input, Tooltip } from "@chakra-ui/react";
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
import { useTableFilters } from "../../logic/hooks/tableHooks";

/**
 * Component showing all the players in a big list
 */
export const PlayerOverview = React.memo(function MatchHistory() {
    const navigate = useNavigate();

    const { showOnlyQualfied, searchInput, onShowOnlyQualifiedChange, onSearchChange } = useTableFilters();

    const allPlayers: { [id: string]: Player } | undefined = useSelector(StatsSelectors.getPlayers);
    const players: Player[] = useSelector((state: AppState) => StatsSelectors.getPlayersByDate(state));

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
                <Tooltip
                    label={<p style={{ textAlign: "center" }}>Players play 10 games to be qualified.</p>}
                    hasArrow
                    arrowSize={15}
                >
                    <Box padding={"8px"}>
                        <Checkbox isChecked={showOnlyQualfied} onChange={onShowOnlyQualifiedChange}>
                            {"Show only qualified"}
                        </Checkbox>
                    </Box>
                </Tooltip>
                <Box padding={"8px"}>
                    <Input placeholder="Filter by..." onChange={onSearchChange} value={searchInput} />
                </Box>
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
