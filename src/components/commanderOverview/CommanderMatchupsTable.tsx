import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SortableTable } from "../dataVisualizations/SortableTable";
import { AppState } from "../../redux/rootReducer";
import { StatsSelectors } from "../../redux/stats/statsSelectors";
import {
    CommanderMatchupItem,
    commanderMatchupsColumns
} from "../dataVisualizations/columnHelpers/commanderMatchupsColumnHelper";
import { commanderList } from "../../services/commanderList";
import { filterMatchesByPlayerCount } from "../../logic/dictionaryUtils";
import { NUMBER_OF_PLAYERS_FOR_VALID_MATCH } from "../constants";

export const CommanderMatchupsTable = React.memo(function CommanderMatchupsTable({
    commanderName,
    dateFilter
}: {
    commanderName: string;
    dateFilter?: Date;
}) {
    const navigate = useNavigate();

    // get all the valid matches the commander has participated in
    const matches = filterMatchesByPlayerCount(
        useSelector((state: AppState) => StatsSelectors.getMatchesByCommanderName(state, commanderName, dateFilter)),
        NUMBER_OF_PLAYERS_FOR_VALID_MATCH
    );
    const commanderMatchups: { [commanderId: string]: CommanderMatchupItem } = {};

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
            // loop through each of those player's commanders, and update the number of games against that commander
            for (const commander of player.commanders) {
                // if this commander is the commander that we are getting matchups for,
                // skip that since we don't want their record against themself
                if (commander !== commanderName) {
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

                    // check to see if the winning commander(s) of the match is commander we are getting matchups for
                    if (winningCommanders.indexOf(commanderName) > -1) {
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
