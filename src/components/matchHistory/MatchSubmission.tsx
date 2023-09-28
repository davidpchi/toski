import React, { useCallback, useState } from "react";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { submitMatch } from "../../services/matchHistoryService";
import { FiUserPlus, FiX } from "react-icons/fi";

const MatchSubmissionPlayerCard = React.memo(function MatchSubmissionPlayerCard({
    title,
    playerValue,
    commanderValue,
    rankValue,
    setPlayerValue,
    setCommanderValue,
    setPlayerRank
}: {
    title: string,
    playerValue: string,
    commanderValue: string,
    rankValue: number
    setPlayerValue: (val: string) => void,
    setCommanderValue: (val: string) => void,
    setPlayerRank: (val: number) => void
}) {
    const onUpdatePlayerName = useCallback((event: any) => {
        setPlayerValue(event.target.value);
    }, []);

    const onUpdateCommander = useCallback((event: any) => {
        setCommanderValue(event.target.value);
    }, []);

    const onUpdateRank = useCallback((event: any) => {
        setPlayerRank(Number(event.target.value));
    }, []);

    return (
        <Flex direction='column' justify='center' align='left' marginBottom={"16px"} borderWidth={1} padding={"8px"} borderRadius={"8px"}>
            <Flex justifyContent={"space-between"} >
                <Heading size={"md"}>{title}</Heading>
                <Button size="md" variant={"ghost"}>
                    <FiX />
                </Button>
            </Flex>
            <Text>Name:</Text>
            <Input value={playerValue} onChange={onUpdatePlayerName} marginBottom={"16px"}></Input>
            <Text>Commander:</Text>
            <Input value={commanderValue} onChange={onUpdateCommander} marginBottom={"16px"}></Input>
            <Text>Rank:</Text>
            <Input value={rankValue} onChange={onUpdateRank} marginBottom={"16px"}></Input>
        </Flex>
    )
})

type MatchSubmissionPlayer = {
    name: string,
    commander: string,
    rank: number,
    isActive: boolean
}

export const MatchSubmission = React.memo(function MatchSubmission() {
    const [date, setDate] = useState<Date>(new Date());

    const [player1Name, setPlayer1Name] = useState<string>("");
    const [player1Commander, setPlayer1Commander] = useState<string>("");
    const [player1Rank, setPlayer1Rank] = useState<number>(0);

    const submitData = useCallback(() => {
        const player1 = {
            name: player1Name,
            commander: player1Commander,
            turnOrder: 1,
            rank: player1Rank
        };


        submitMatch(date, player1);
    }, [player1Name, player1Commander, player1Rank]);

    const matchSubmissionPlayerCards = [];

    return (
        <Flex direction='column' justify='center' align='center'>
            <Heading>SUBMIT MATCH</Heading>
            <Flex direction='column' justify='center' align='left' marginBottom={"16px"}>
                <Text>Date:</Text>
                <Flex direction='row' justify='center' align='left' marginBottom={"16px"}>
                    <MatchSubmissionPlayerCard
                        title={"Player 1"}
                        playerValue={player1Name}
                        commanderValue={player1Commander}
                        rankValue={player1Rank}
                        setPlayerValue={setPlayer1Name}
                        setCommanderValue={setPlayer1Commander}
                        setPlayerRank={setPlayer1Rank} />
                    <MatchSubmissionPlayerCard
                        title={"Player 2"}
                        playerValue={player1Name}
                        commanderValue={player1Commander}
                        rankValue={player1Rank}
                        setPlayerValue={setPlayer1Name}
                        setCommanderValue={setPlayer1Commander}
                        setPlayerRank={setPlayer1Rank} />
                    <Button variant={"ghost"} size={"lg"} alignSelf={"center"} margin={"16px"} >
                        <FiUserPlus />
                    </Button>
                </Flex>
            </Flex>
            <Button onClick={submitData}>Submit Data</Button>
        </Flex>
    )
});