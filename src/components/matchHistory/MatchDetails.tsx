import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AppState } from "../../redux/rootReducer";
import { useSelector } from "react-redux";
import { getMatch } from "../../redux/statsSelectors";
import { Loading } from "../Loading";
import { FiLoader } from "react-icons/fi";

export async function loader(data: { params: any }) {
    return data.params.matchId;
};

export type MatchDisplayCommander = {
    name: string;
    // image: string;
};

export type MatchDisplayPlayer = {
    name: string;
    commander: MatchDisplayCommander;
    isWinner: boolean;
};

const MatchPlayerCard = React.memo(
    ({
        player,
        textColor,
        backgroundColor,
        borderColor,
    }: {
        player: MatchDisplayPlayer;
        textColor?: string;
        backgroundColor?: string;
        borderColor?: string;
    }) => {
        const navigate = useNavigate();

        const championNav = useCallback(() => {
            navigate('/commanderOverview/' + player.commander.name);
        }, [navigate, player.commander.name]);

        const playerNav = useCallback(() => {
            navigate('/playerOverview/' + player.name.toLowerCase());
        }, [navigate, player.name]);

        return (
            <Flex
                flex={1}
                align={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
                minWidth={160}
                maxWidth={250}
                borderWidth={5}
                borderColor={player.isWinner ? "#2f2477" : "transparent"}
                borderRadius={8}
            >
                <Button
                    variant='ghost'
                    alignSelf={'stretch'}
                    onClick={championNav}
                    flex={1}
                    padding={1}
                    size='md'

                >
                    <Image src={"https://cards.scryfall.io/normal/front/0/8/0873cfa8-046c-4b14-ae22-3fd6a691f763.jpg?1674137476"} />
                </Button>
                <Button
                    variant='ghost'
                    onClick={playerNav}
                    alignSelf={'stretch'}
                    backgroundColor={backgroundColor}
                    borderColor={borderColor}
                    borderWidth={borderColor ? 5 : undefined}
                    size='md'
                    flexDirection='row'
                >
                    {player.isWinner ? <FiLoader height={32} /> : <Box height='32' />}
                    <Text
                        style={{
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            color: textColor,
                        }}
                        onClick={playerNav}
                        marginLeft={4}
                        marginRight={4}
                    >
                        {player.name.toUpperCase()}
                    </Text>
                    {player.isWinner ? <FiLoader height={32} /> : <Box height='32' />}
                </Button>
            </Flex>
        );
    }
);

export const MatchDetails = React.memo(function MatchDetails() {

    const matchId = useLoaderData() as string;

    // look up this matchId in the matchHistory
    const match = useSelector((state: AppState) => getMatch(state, matchId));

    if (match === undefined) {
        return <Loading text="" />
    }

    const title = `GAME ${match.id}`

    const playerCards = match.players.map((player) => {
        const matchPlayer: MatchDisplayPlayer = {
            name: player.name,
            commander: {
                name: player.commander
            },
            isWinner: match.winner === player.name
        }

        return (
            <MatchPlayerCard
                player={matchPlayer}
                key={'MatchPlayerCard_' + player.name}
            />
        );
    });

    return (
        <Flex direction='column' justify='center' align='center'>
            <Heading>{title}</Heading>
            <Flex
                direction={'row'}
                flex={1}
                marginBottom={8}
                flexWrap={'wrap'}
            >
                {playerCards}
            </Flex>
            {match.numberOfTurns ? <Text>
                {`Winner: ${match.winner}`}
            </Text> : null}
            {match.numberOfTurns ? <Text>
                {`Number of turns: ${match.numberOfTurns}`}
            </Text> : null}
        </Flex>
    )
});