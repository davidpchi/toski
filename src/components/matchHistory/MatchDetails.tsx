import React from "react";
import { useLoaderData } from "react-router-dom";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";

import { AppState } from "../../redux/rootReducer";
import { useSelector } from "react-redux";
import { getMatch } from "../../redux/statsSelectors";
import { Loading } from "../Loading";
import { commanderList } from "../../services/commanderList";
import { MatchDisplayPlayer } from "./types/MatchDisplayPlayer";
import { MatchPlayerCard } from "./MatchPlayerCard";
import { rankDictionary } from "../constants";

export async function loader(data: { params: any }) {
    return data.params.matchId;
}

export const MatchDetails = React.memo(function MatchDetails() {
    const matchId = useLoaderData() as string;

    // look up this matchId in the matchHistory
    const match = useSelector((state: AppState) => getMatch(state, matchId));

    if (match === undefined) {
        return <Loading text="" />;
    }

    const title = `GAME ${match.id}`;

    const playerCards = match.players.map((player) => {
        const matchPlayer: MatchDisplayPlayer = {
            name: player.name,
            rank: rankDictionary[player.rank],
            commanders: player.commanders.map((commanderName: string) => {
                return {
                    name: commanderName,
                    id: commanderList[commanderName] ? commanderList[commanderName].id : undefined,
                };
            }),
            isWinner: match.winner === player.name,
        };

        return <MatchPlayerCard player={matchPlayer} key={"MatchPlayerCard_" + player.name} />;
    });

    return (
        <Flex direction="column" justify="center" align="center">
            <Heading>{title}</Heading>
            <Flex direction={"row"} flex={1} marginBottom={8} flexWrap={"wrap"}>
                {playerCards}
            </Flex>
            {match.winner ? <Text>{`Winner: ${match.winner}`}</Text> : null}
            {match.numberOfTurns ? <Text>{`Number of turns: ${match.numberOfTurns}`}</Text> : null}
        </Flex>
    );
});
