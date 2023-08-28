import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { SortableTable } from "../SortableTable";
import { matchHistoryColumns } from "./matchHistoryColumnHelper";
import { getMatches } from "../../redux/statsSelectors";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";
import { Player } from "../../types/domain/Player";
import { Match } from "../../types/domain/Match";
import { match } from "assert";

export const MatchHistory = React.memo(function MatchHistory() {
    const navigate = useNavigate();

    const matches = useSelector(getMatches);

    if (matches === undefined) {
        return <Loading text="" />;
    }

    // ADD TEST CODE HERE AS NEEDED
    console.dir(matchesToPlayers(matches));
    // MARKING FOR AXIOMATICADI
    
    return (
        <Flex direction='column' justify='center' align='center'>
            <Heading>Match History</Heading>
            <SortableTable
                columns={matchHistoryColumns}
                data={matches}
                getRowProps={(row: any) => {
                    return {
                        onClick: () => {
                            navigate('/matchHistory/' + row.original.id);
                            window.scrollTo(0, 0);
                        },
                    };
                }}
            />
        </Flex>
    );
});

// ADDITIONAL TEST CODE BELOW (AXIOMATICADI)
// given a collection of matches, return all of the players in those matches
function matchesToPlayers(matches: Match[]): { [name: string]: Player } {
    const playerDictionary: { [name: string]: Player } = {};
    for (const currentMatch of matches) {
        // iterate through each player, and add those commanders to our commander dictionary
        for (const player of currentMatch.players) {
            const currentPlayerName = player.name;
            const potentialPlayerObj = playerDictionary[currentPlayerName];

            // if the entry doesn't exist, add to dictionary
            if  (potentialPlayerObj === undefined) {
                playerDictionary[currentPlayerName] = {
                    name: currentPlayerName,
                    matches: [currentMatch],
                    wins: (player.rank === "1") ? 1 : 0,
                }
            } else {
                // since this player exists, update the currentMatch count
                playerDictionary[currentPlayerName].matches.push(currentMatch);
                if (player.rank === "1") { 
                    playerDictionary[currentPlayerName].wins++; 
                }
            }
        }
    }
    return playerDictionary;
}