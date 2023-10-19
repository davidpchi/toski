import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SortableTable } from "../dataVisualizations/SortableTable";
import { AppState } from "../../redux/rootReducer";
import { getMatchesByPlayerName } from "../../redux/stats/statsSelectors";
import {
    PlayerMatchupItem,
    playerMatchupsColumns
} from "../dataVisualizations/columnHelpers/playerMatchupsColumnHelper";

export const PlayerMatchupsTable = React.memo(function PlayerMatchupsTable({
    playerId,
    dateFilter
}: {
    playerId: string;
    dateFilter?: Date;
}) {
    const navigate = useNavigate();

    // get all the matches of the player has participated in
    const matches = useSelector((state: AppState) => getMatchesByPlayerName(state, playerId, dateFilter));
    const playerMatchups: { [playerId: string]: PlayerMatchupItem } = {};

    for (const match of matches) {
        // loop through all the players of that match
        for (const player of match.players) {
            // if this is the player that we are getting matchups for, skip that since we don't want their record against themself
            if (player.name !== playerId) {
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

                // check to see if the winner of the match is player we are getting matchups for
                if (playerId === match.winner) {
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
