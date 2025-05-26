import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SortableTable } from "../dataVisualizations/SortableTable";
import { AppState } from "../../redux/rootReducer";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import {
    PlayerMatchupItem,
    playerMatchupsColumns
} from "../dataVisualizations/columnHelpers/playerMatchupsColumnHelper";
import { filterMatchesByPlayerCount } from "../../logic/dictionaryUtils";
import { NUMBER_OF_PLAYERS_FOR_VALID_MATCH } from "../constants";

export const PlayerMatchupsTable = React.memo(function PlayerMatchupsTable({
    commanderName
}: {
    commanderName: string;
}) {
    const navigate = useNavigate();

    // get all the valid matches the commander has participated in
    const matches = filterMatchesByPlayerCount(
        useSelector((state: AppState) => StatsSelectors.getMatchesByCommanderName(state, commanderName)),
        NUMBER_OF_PLAYERS_FOR_VALID_MATCH
    );
    const playerMatchups: { [playerId: string]: PlayerMatchupItem } = {};

    for (const match of matches) {
        // get the winning commander of the match
        let winningCommanders: string[] = [];
        for (const player of match.players) {
            if (player.name === match.winner) {
                winningCommanders = player.commanders;
                break;
            }
        }

        // loop through all the players of that match
        for (const player of match.players) {
            if (player.commanders.indexOf(commanderName) === -1) {
                const potentialPlayer = playerMatchups[player.name];
                // check to see if the player already exists in our dictionary. if it doesn't, add it.
                const playerMatchup =
                    potentialPlayer === undefined
                        ? {
                              name: player.name,
                              matchCount: 1,
                              winCount: 0
                          }
                        : { ...potentialPlayer, matchCount: potentialPlayer.matchCount + 1 };

                // check to see if the winner of the match played the commander that we are searching for.
                // because we captured this array earlier, reference equality should be true
                // if we are looking at the winner
                if (winningCommanders.indexOf(commanderName) > -1) {
                    playerMatchup.winCount += 1;
                }

                playerMatchups[player.name] = playerMatchup;
            }
        }
    }

    const playerMatchupsArray = Object.values(playerMatchups).sort((a, b) => b.matchCount - a.matchCount);

    return (
        <SortableTable
            columns={playerMatchupsColumns}
            data={playerMatchupsArray}
            getRowProps={(row: any) => {
                return {
                    onClick: () => {
                        navigate(`/playerOverview/${row.original.name}`);
                        window.scrollTo(0, 0);
                    }
                };
            }}
        />
    );
});
