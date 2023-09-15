import { Checkbox, Flex, Heading, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { SortableTable } from "../dataVisualizations/SortableTable";
import { playerOverviewColumns } from "./playerOverviewColumnHelper";
import { getPlayers } from "../../redux/statsSelectors";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { Player } from "../../types/domain/Player";
import { useNavigate } from "react-router-dom";
import { PLAYER_MINIMUM_GAMES_REQUIRED } from "../constants";

/**
 * Component showing all the players in a big list
 */
export const PlayerOverview = React.memo(function MatchHistory() {
    const navigate = useNavigate();
    const players: { [id: string]: Player } | undefined = useSelector(getPlayers);

    const [isFiltered, setIsFiltered] = useState<boolean>(true);
    const onFilterChange = () => {
        setIsFiltered(!isFiltered);
    };

    if (players === undefined) {
        return <Loading text="Loading..." />;
    }

    let playersArray = Object.values(players);
    playersArray.sort((a: Player, b: Player) => a.name.localeCompare(b.name));
    if (isFiltered) {
        playersArray = playersArray.filter((value: Player) => value.matches.length >= PLAYER_MINIMUM_GAMES_REQUIRED);
    }

    return (
        <Flex direction="column" justify="center" align="center">
            <Heading>Player Overview</Heading>
            <Flex alignSelf={"center"} marginBottom={"16px"}>
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
