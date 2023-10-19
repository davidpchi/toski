import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SortableTable } from "../dataVisualizations/SortableTable";
import { AppState } from "../../redux/rootReducer";
import { getMatchesByPlayerName } from "../../redux/stats/statsSelectors";
import {
    CommanderMatchupItem,
    commanderMatchupsColumns
} from "../dataVisualizations/columnHelpers/commanderMatchupsColumnHelper";
import { commanderList } from "../../services/commanderList";

export const CommanderMatchupsTable = React.memo(function CommanderMatchupsTable({
    playerId,
    dateFilter
}: {
    playerId: string;
    dateFilter?: Date;
}) {
    const navigate = useNavigate();

    // get all the matches of the player has participated in
    const matches = useSelector((state: AppState) => getMatchesByPlayerName(state, playerId, dateFilter));
    const commanderMatchups: { [commanderId: string]: CommanderMatchupItem } = {};

    for (const match of matches) {
        // loop through all the players of that match
        for (const player of match.players) {
            // loop through each of those player's commanders, and update the number of games against that commander
            for (const commander of player.commanders) {
                // if this is the player that we are getting matchups for, skip that since we don't want their record against themself
                if (player.name !== playerId) {
                    const potentialCommander = commanderMatchups[commander];
                    // check to see if the commander already exists in our dictionary. if it doesn't, add it.
                    const commanderMatchup =
                        potentialCommander === undefined
                            ? {
                                  id: commanderList[commander].id,
                                  name: commander,
                                  matchCount: 1,
                                  winCount: 0
                              }
                            : { ...potentialCommander, matchCount: potentialCommander.matchCount + 1 };

                    // check to see if the winner of the match is player we are getting matchups for
                    if (playerId === match.winner) {
                        commanderMatchup.winCount += 1;
                    }

                    commanderMatchups[commander] = commanderMatchup;
                }
            }
        }
    }

    const commanderMatchupsArray = Object.values(commanderMatchups).sort((a, b) => b.matchCount - a.matchCount);

    return (
        <SortableTable
            columns={commanderMatchupsColumns}
            data={commanderMatchupsArray}
            getRowProps={(row: any) => {
                return {
                    onClick: () => {
                        navigate(`/commanderOverview/${row.original.id}`);
                        window.scrollTo(0, 0);
                    }
                };
            }}
        />
    );
});
